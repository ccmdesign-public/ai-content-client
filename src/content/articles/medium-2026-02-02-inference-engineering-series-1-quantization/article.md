---
title: "Inference Engineering Series #1: Quantization"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/inference-engineering-series-1-quantization-83f7e60e11b6?source=rss----5517fd7b58a6---4"
publishedAt: "2026-02-02"
tags:
  - "engineering"
  - "llm"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.672Z"
---

# Inference Engineering Series #1: Quantization

# ***Inference Engineering Series #1: Quantization***

[Adam Louly](https://medium.com/@adamlouly?source=post_page---byline--83f7e60e11b6---------------------------------------)

8 min read·11 hours ago

\--

![]()

Since I started learning AI/ML, I’ve developed a learning approach that consistently works for me:

> implement the simplest version of a concept from scratch, then gradually build it into the real thing.

It’s not always the fastest path, but it’s the one that helps me truly understand what’s happening behind the scenes. Over time, I realized that many tutorials jump directly into high-level libraries, which is great for productivity .. but not always great for building intuition.

So in this series, I’ll apply this “first principles” approach to several inference optimization techniques. We’ll start with small, minimal implementations, and progressively level them up into something that resembles how production systems work.

## ***Quantization is one of the most widely used techniques in modern ML inference.***

By default, most models store weights and activations in FP32 (32-bit floating point). Quantization is the process of transforming FP32 values into a lower precision representation, such as:

-   FP16 / BF16
-   INT8
-   INT4
-   and more recent formats like FP8 / FP4 variants

The goal is simple: represent the same model using fewer bits.

And the benefits can be huge:

-   smaller memory footprint, so smaller GPUs can run bigger models
-   lower memory bandwidth, which often matters more than raw compute
-   faster transfers (CPU ↔ GPU) and faster movement inside the GPU memory hierarchy
-   in many cases, faster kernels, especially on hardware that supports low-precision math natively

That’s why quantization is considered one of the top inference optimization techniques today.

## ***What we’ll build in this article***

In this first post, we’ll implement a minimal CUDA-based setup and build two versions of the same computation:

1.  FP32 elementwise addition
2.  INT8 elementwise addition (with quantize/dequantize logic)

I’m choosing INT8 intentionally because it forces us to deal with the real quantization mechanics you’ll see in real systems:

-   scaling
-   clamping
-   range overflow
-   zero-point (for asymmetric quantization)
-   and the concept of calibration

Finally, we’ll compare:

-   performance and numerical error

Along the way, I’ll also explain CUDA fundamentals as we need them (threads, blocks, memory transfers, etc.), so even if you’re not fully comfortable with CUDA/C++ yet, you’ll be able to follow and build on it.

Alright !! let’s get started.

## ***Step 1 — FP32 Elementwise Addition (Baseline)***

Before we optimize anything, we need a baseline.

Let’s implement a simple CUDA kernel that adds two FP32 arrays elementwise:

out\[i\]=a\[i\]+b\[i\]

This will serve as our “ground truth” for correctness and performance.

## ***A note about CUDA errors (CUDA\_CHECK)***

CUDA errors can be silent if you don’t explicitly check them. For example, a kernel launch might fail, but your program continues running and later crashes somewhere unrelated, which makes debugging extremely painful.

That’s why we’ll define a `CUDA_CHECK` helper macro. This wraps any CUDA call and immediately stops the program if an error happens.

```
#define CUDA_CHECK(expr) do { \    cudaError_t err_ = (expr); \    if (err_ != cudaSuccess) { \        std::cerr << "CUDA Error: " << cudaGetErrorString(err_) \                  << " at " << __FILE__ << ":" << __LINE__ << std::endl; \        std::exit(1); \    } \} while (0)
```

This is one of those “small engineering habits” that saves hours later.

## ***A minimal Tensor class (host + device)***

To avoid repeating memory boilerplate every time, we’ll implement a minimal `Tensor1D<T>`.

This tensor stores:

-   a host pointer (`h_ptr`) allocated on CPU
-   a device pointer (`d_ptr`) allocated on GPU

helper methods:

-   `h2d()` to copy CPU → GPU
-   `d2h()` to copy GPU → CPU

```
template <typename T>struct Tensor1D {    int n=0;    T* d_ptr=nullptr;    T* h_ptr=nullptr;    explicit Tensor1D(int n_): n(n_) {        CUDA_CHECK(cudaMalloc(&d_ptr, n * sizeof(T)));        h_ptr = new T[n];    }    ~Tensor1D() {        if (d_ptr) {            CUDA_CHECK(cudaFree(d_ptr));        }        if (h_ptr) {            delete[] h_ptr;        }    }    void h2d() {        CUDA_CHECK(cudaMemcpy(d_ptr, h_ptr, n * sizeof(T), cudaMemcpyHostToDevice));    }    void d2h() {        CUDA_CHECK(cudaMemcpy(h_ptr, d_ptr, n * sizeof(T), cudaMemcpyDeviceToHost));    }};
```

## ***FP32 addition kernel***

Here’s the kernel:

```
__global__ void fp32_add_kernel(const float* __restrict__ a,                                const float* __restrict__ b,                                float* __restrict__ out,                                int n) {    int idx = blockIdx.x * blockDim.x + threadIdx.x;    if (idx < n) {        out[idx] = a[idx] + b[idx];    }}
```

A few key CUDA concepts here:

-   `__global__` means this function is a GPU kernel (launchable from CPU).
-   CUDA launches many threads in parallel.
-   Each thread computes a global index:

```
idx = blockIdx.x * blockDim.x + threadIdx.x
```

Then each thread adds exactly one element.

Also note `__restrict__`:
this tells the compiler these pointers don’t overlap in memory, which enables better optimizations. each thread will be responsible for a single output sum.

## ***Running the kernel***

In `main()`, we allocate tensors, fill them, copy to device, run the kernel, then copy results back.

```
int main() {    const int n = 1 << 20; //1m elements    const int threads = 256;    const int blocks = (n + threads - 1) / threads;    const int iters = 200;  ...    a.h2d();    b.h2d();    fp32_add_kernel<<<blocks, threads>>>(a.d_ptr, b.d_ptr, out_fp32.d_ptr, n);    CUDA_CHECK(cudaGetLastError());    CUDA_CHECK(cudaDeviceSynchronize());    out_fp32.d2h();  ...}
```

We can run our kernel by running this:

```
nvcc -O3 -std=c++17 fp32_add.cu -o fp32_add & ./fp32_add
```

Example output (printing a few indices):

```
[1] 373085i=0 a=2.2 b=1.7 fp32=3.9i=1 a=2.2031 b=1.69985 fp32=3.90295i=2 a=2.2062 b=1.69971 fp32=3.90591i=123 a=2.58017 b=1.66932 fp32=4.24949i=999 a=4.79592 b=0.775149 fp32=5.57106i=268435455 a=-3.15521 b=-1.41748 fp32=-4.57269FP32 add avg ms: 12.9196OK
```

And as expected: FP32 addition has no precision loss.

## Get Adam Louly’s stories in your inbox

 from this writer.

Now onto the good part

## ***Step 2 — INT8 Quantization***

***I***NT8 quantization is where things start getting interesting.

FP32 uses 32 bits per number.
INT8 uses only 8 bits per number.

So at a high level, we’re trying to represent the same tensor using 4x less memory:

![]()

In order to do that, we should first check the range definition of int8, if you see the figure above you’ll notice that the int8 is represented by a 8 bits (1 for sign and 7 for the mantissa), which means the range of definition will be: q∈\[−128,127\]
So we would need to map the fp32 range seen in the figure into the smaller range, using a simple mathematical function.

which is:

![]()

Pretty clear right? but how do we compute the scale and the zeropoint?

## ***Scale and zero-point***

To quantize FP32 values into INT8, we use:

-   scale: how much float value corresponds to 1 integer step

![]()

-   zero-point: shifts the mapping so that `x = 0` is representable exactly

![]()

Why do we need these?

-   without `scale`, values overflow immediately
-   without `zero_point`, the representation is worse when values are not symmetric around 0
-   without `clamp`, we get integer overflow / saturation

## ***Quantization parameters struct***

***We’ll define a small struct:***

```
struct QuantParams {    float scale = 1.0f;    int zero_point = 0;};
```

## ***Calibration***

The term calibration simply means:

> determine quantization parameters (scale, zero-point) using real data statistics.

The simplest calibration strategy is `min/max` calibration:
scan the input values and compute:

-   `min_v`
-   `max_v`

Then compute `scale` so that the float range maps into the int8 range.

Here is a minimal calibration implementation:

```
inline QuantParams calibrate_int8_params(const std::vector<float>& a,                                         const std::vector<float>& b) {    auto [min_a, max_a] = std::minmax_element(a.begin(), a.end());    auto [min_b, max_b] = std::minmax_element(b.begin(), b.end());    float min_v = std::min(*min_a, *min_b);    float max_v = std::max(*max_a, *max_b);    if (max_v == min_v) {        return QuantParams{1.0f, 0};    }    float scale = (max_v - min_v) / 255.0f;    if (scale < 1e-8f) {        scale = 1e-8f;    }    int zero_point = static_cast<int>(std::lround(-min_v / scale)) - 128;    zero_point = std::min(127, std::max(-128, zero_point));    return QuantParams{scale, zero_point};}
```

In the example we did compute the scale and the zero point for both a and b, in reality each one should have its own scale and zero point.

## ***INT8 quantization kernel***

Now we can write the quantization kernel:

```
__global__ void quantize_int8_kernel(const float* __restrict__ src,                                     int8_t* __restrict__ dst,                                     int n,                                     float scale,                                     int zero_point) {    int idx = blockIdx.x * blockDim.x + threadIdx.x;    if (idx < n) {        float q = src[idx] / scale + static_cast<float>(zero_point);        int qi = clamp_int8(__float2int_rn(q));        dst[idx] = static_cast<int8_t>(qi);    }}
```

This kernel does the following per element:

1.  scale the float value into int8 domain
2.  shift by the zero-point
3.  round to nearest integer
4.  clamp to `[-128, 127]` to prevent overflow
5.  store as `int8_t`

This clamping step is extremely important: without it, large values would overflow and wrap, which is catastrophic for correctness.

## ***INT8 element-wise addition (integer math)***

Now that we can quantize FP32 tensors into INT8, the next step is to compute the sum of a and b.

But this time, we want to do it using quantized values, so a and b would be int8 but we will accumulate in out which will be int32.

But why the output is int32 (and not int8)?

If we add two int8 values, the result may exceed the range \[-128, 127\].

Example:

-   127 + 127 = 254 ❌ doesn’t fit into int8

So we compute the sum into an int32 accumulator.

This is also what real quantized systems do:
low precision storage + higher precision accumulation.

## ***INT8 addition kernel***

```
__global__ void int8_add_kernel(const int8_t* __restrict__ a,                                const int8_t* __restrict__ b,                                int32_t* __restrict__ out,                                int n,                                int zero_point) {    int idx = blockIdx.x * blockDim.x + threadIdx.x;    if (idx < n) {        int ai = static_cast<int>(a[idx]);        int bi = static_cast<int>(b[idx]);        out[idx] = (ai - zero_point) + (bi - zero_point);    }}
```

## ***What this kernel is doing***

Each thread:

1.  loads `a[idx]` and `b[idx]` (INT8 values)
2.  converts them to int (`ai`, `bi`) so arithmetic happens in 32-bit
3.  subtracts `zero_point` to move from quantized domain back to integer domain
4.  adds them and stores result in int32

## ***Dequantization back to FP32***

To compare against FP32 baseline, we convert the int32 output back into float.

```
__global__ void dequantize_int32_kernel(const int32_t* __restrict__ src,                                        float* __restrict__ dst,                                        int n,                                        float scale) {    int idx = blockIdx.x * blockDim.x + threadIdx.x;    if (idx < n) {        dst[idx] = static_cast<float>(src[idx]) * scale;    }}
```

Let’s run the benchmark and see how fast this is?

```
[1] 598882Calibration => scale=0.0413598 zero_point=0i=0 a=2.2 b=1.7 int8=3.88782 scale=0.0413598 zp=0i=1 a=2.2031 b=1.69985 int8=3.88782 scale=0.0413598 zp=0i=2 a=2.2062 b=1.69971 int8=3.88782 scale=0.0413598 zp=0i=123 a=2.58017 b=1.66932 int8=4.2187 scale=0.0413598 zp=0i=999 a=4.79592 b=0.775149 int8=5.58357 scale=0.0413598 zp=0i=268435455 a=-3.15521 b=-1.41748 int8=-4.54957 scale=0.0413598 zp=0INT8 add only avg ms: 6.66027OK
```

As you can see the avg ms time of int8 is half the avg ms of fp32 kernel.

Note that we’ve only computed the time of add kernel and we excluded the time of quantize and dequantize.

Full kernels code can be found here: [https://github.com/AdamLouly/inferenceEngineering/tree/main/1-Quantization](https://github.com/AdamLouly/inferenceEngineering/tree/main/1-Quantization)

## ***Conclusion***

This is your entry point to the world of quantization, next I would suggest reading about different concepts Like

Per-tensor vs per-channel quantization : [https://developer.nvidia.com/blog/model-quantization-concepts-methods-and-why-it-matters/](https://developer.nvidia.com/blog/model-quantization-concepts-methods-and-why-it-matters/)

Modern low-precision formats such as FP8 (E4M3/E5M2) and 4-bit quantization (INT4 / NF4 / FP4 variants): [https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/) [https://huggingface.co/blog/RakshitAralimatti/learn-ai-with-me](https://huggingface.co/blog/RakshitAralimatti/learn-ai-with-me)