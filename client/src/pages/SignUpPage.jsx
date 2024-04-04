import { Link } from "react-router-dom"; 

export const SignUpPage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa] flex justify-center items-center p-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:block md:w-1/2 bg-black p-4">
            <img
              alt="Space illustration"
              className="object-cover object-center h-full w-full"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 sm:p-12">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">
                Create your Free Account
              </h2>
              <p className="text-sm mb-8">
                Already have an account?
                <Link className="text-blue-600" href="#">
                  Log in
                </Link>
              </p>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="full-name">
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    placeholder="Enter your Full Name here"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your Email here"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    placeholder="Enter your Password here"
                    type="password"
                  />
                </div>
                <button className="w-full">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
