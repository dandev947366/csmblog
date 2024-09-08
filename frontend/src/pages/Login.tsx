
function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form action="">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm py-2 font-bold">Email:</label>
          <input type="text" id="email" placeholder="Enter email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus-blue-200 h-8"/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm py-2 font-bold">Password:</label>
          <input type="text" id="password" placeholder="Enter password" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus-blue-200 h-8"/>
        </div>
        <div className="mb-6">
          <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-700">Submit</button>
        </div>
        <p className="text-center text-blue-700"><a href="/">Forgot password?</a></p>
      </form>
    </div>
    </div>
  )
}

export default Login