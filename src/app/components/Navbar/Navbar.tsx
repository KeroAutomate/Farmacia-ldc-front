"use client";
export const runtime = 'edge';
import "./navbar.css"

const NavBar = () => {

  return (
    <nav className="sections">
      {/* <ul>
        <li className="list">
          <span onClick={toggleDropdown} className="departs">
            <Image
              src="/Departs.svg"
              alt="departs"
              width={22}
              height={22}
            />
          </span>
          <button onClick={toggleDropdown} className="dropdown-button">
            Todas as Categorias
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {categories.map((category, index) => (
                <li key={index} className="dropdown-item">
                  {category}
                </li>
              ))}
            </ul>
          )}
          <li>
            <Link href={"/"}>Mamães e Bebês</Link>
          </li>
          <li>
            <Link href={"/"}>Produtos de Beleza</Link>
          </li>
          <li>
            <Link href={"/"}>Medicamentos</Link>
          </li>
        </li>
      </ul> */}
    </nav>
  );
};

export default NavBar;
