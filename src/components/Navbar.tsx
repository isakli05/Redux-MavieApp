import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full z-50 text-white gap-2 dark:bg-slate-900 flex p-4 justify-between items-center">
      <div className="hidden md:inline-flex space-x-2 mr-4 pl-4">
        <span className="md:block text-slate-900 dark:text-slate-100 font-bold text-2xl">
          <NavLink to={"/"}>LMDB</NavLink>
        </span>
      </div>

      <ul className="hidden z-10 md:flex space-x-4 dark:text-slate-100 text-slate-900">
        {/* <li className="rounded-md dark:text-slate-100 hover:cursor-pointer dark:bg-blue-800  px-4 py-2">Home</li> */}

        <li className="px-4 py-2">
          <div className="group inline-block relative">
            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">Filmler</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            <ul className="absolute hidden text-gray-700 min-w-max pt-1 group-hover:block">
              <li className="hover:cursor-pointer">
                <NavLink
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/movie"}
                >
                  Popüler
                </NavLink>
              </li>
              <li className="hover:cursor-pointer">
                <NavLink
                  className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/movie/now-playing"}
                >
                  Gösterimdekiler
                </NavLink>
              </li>
              <li className="hover:cursor-pointer">
                <NavLink
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/movie/upcoming"}
                >
                  Yakında
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="px-4 py-2 hover:cursor-pointer">
          <div className="group inline-block relative">
            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">Diziler</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            <ul className="absolute hidden text-gray-700 min-w-max pt-1 group-hover:block">
              <li className="hover:cursor-pointer">
                <NavLink
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/tv"}
                >
                  Popüler
                </NavLink>
              </li>
              <li className="hover:cursor-pointer">
                <NavLink
                  className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/tv/airing-today"}
                >
                  Günün Programı
                </NavLink>
              </li>
              <li className="hover:cursor-pointer">
                <NavLink
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/tv/on-the-air"}
                >
                  Televizyonda
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li className="px-4 py-2 hover:cursor-pointer">
          <div className="group inline-block relative">
            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">Kişiler</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            <ul className="absolute hidden text-gray-700 min-w-max pt-1 group-hover:block">
              <li className="hover:cursor-pointer">
                <NavLink
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  to={"/person"}
                >
                  Popüler Kişiler
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <input
        className="flex-1 py-2 text-slate-900  placeholder:text-slate-900 px-4 rounded-lg max-w-xl"
        placeholder="Search"
      />

      <button className="rounded-full bg-blue-500 p-2 md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6 dark:text-slate-900 text-slate-100"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </nav>
  );
}

export default Navbar;
