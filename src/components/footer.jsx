function Footer() {
  return (
    <div
      className="
  before:content-['']
   before:absolute
    before:top-0
    before:left-0
    before:w-screen
    before:h-[1px]
    before:bg-slate-500/20

    relative
    h-[20rem]
    flex items-center justify-center
    dark:bg-gray-950
    dark:text-white
    
    "
    >
      <div className="container max-w-screen-lg mx-auto  ">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold">LaborClock</h1>
          <p className="text-lg mt-4">
            Made with ❤️ by{' '}
            <a href="#" className="text-blue-500 hover:underline">
              @Daniel Wolf 👨‍💻
            </a>
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 "
            >
              Contact Us
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
