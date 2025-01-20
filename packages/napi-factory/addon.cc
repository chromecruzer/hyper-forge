#include <napi.h>

// Function to return a greeting
Napi::String Hello(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    return Napi::String::New(env, "Hello from C++!");
}

// Function to calculate the Fibonacci number at a given position
Napi::Number Fibonacci(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Check if the correct number of arguments is passed and it's a number
    if (info.Length() < 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
        return Napi::Number::New(env, 0);
    }

    int n = info[0].As<Napi::Number>().Int32Value();

    // Calculate the nth Fibonacci number
    int a = 0, b = 1, next;
    for (int i = 2; i <= n; i++)
    {
        next = a + b;
        a = b;
        b = next;
    }
    int fib_result = (n == 0) ? a : b;

    return Napi::Number::New(env, fib_result);
}

Napi::Number Add(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Check if the correct number of arguments is passed and both are numbers
    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Two numbers expected").ThrowAsJavaScriptException();
        return Napi::Number::New(env, 0);
    }

    double a = info[0].As<Napi::Number>().DoubleValue();
    double b = info[1].As<Napi::Number>().DoubleValue();

    // Return the sum
    return Napi::Number::New(env, a + b);
}

// Init function to export the functions to JavaScript
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Hello));
    exports.Set(Napi::String::New(env, "fibonacci"), Napi::Function::New(env, Fibonacci));
     exports.Set(Napi::String::New(env, "add"), Napi::Function::New(env, Add));
    return exports;
}

NODE_API_MODULE(addon, Init)
