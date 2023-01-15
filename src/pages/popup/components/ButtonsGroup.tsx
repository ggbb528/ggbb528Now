import {
  faFacebook,
  faTwitch,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import opggLogo from '@assets/img/opgglogo.svg';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

function Button(props: ButtonProps) {
  const handleOnClick = () => {
    if (props.href) {
      chrome.tabs.create({ url: props.href });
    }
  };
  return (
    <button
      {...props}
      type="button"
      className={`w-1/4 py-1 border-black text-blue-600 font-medium text-xs leading-tight
        uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0
        transition duration-150 ease-in-out ${props.className}`}
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
}

// Dropdown Item
interface DropdownItemProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
}
function DropdownItem(props: DropdownItemProps) {
  const handleOnClick = () => {
    if (props.href) {
      chrome.tabs.create({ url: props.href });
    }
  };

  return (
    <li>
      <a
        className={` dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap 
        bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white 
        focus:bg-gray-700 active:bg-blue-600 ${props.className}`}
        onClick={handleOnClick}
        href="#"
      >
        {props.children}
      </a>
    </li>
  );
}

// Dropdown
interface DropdownProps {
  className?: string;
  children?: React.ReactNode;
  ariaLabelledby?: string;
}

function Dropdown(props: DropdownProps) {
  return (
    <ul
      className={`dropdown-menu min-w-max absolute hidden text-base z-50 float-left py-2
    list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800
    ${props.className}`}
      aria-labelledby={props.ariaLabelledby}
    >
      {props.children}
    </ul>
  );
}

export default function ButtonsGroup() {
  return (
    <div className="container flex items-center justify-center">
      <div className="container inline-flex" role="group">
        <Button
          className="border rounded-l"
          href="https://www.twitch.tv/ggbb528"
        >
          <FontAwesomeIcon icon={faTwitch} size={'2xl'} color={'#6441a5'} />
        </Button>
        <Button
          className="border-t border-b border-r"
          data-bs-toggle="dropdown"
          id="dropdownMenuButton"
        >
          <img alt="opgg logo" src={opggLogo} className="m-auto w-4/5" />
        </Button>
        <Dropdown ariaLabelledby="dropdownMenuButton">
          <DropdownItem href="https://www.op.gg/summoners/kr/%EC%A4%80%20%EB%B0%9B">
            韓服 - 준 받
          </DropdownItem>
          <DropdownItem href="https://www.op.gg/summoners/tw/Twitch%E5%8B%9D%E6%95%97%E9%9B%A3%E5%85%8D">
            台服 - Twitch勝敗難免
          </DropdownItem>
        </Dropdown>
        <Button
          className="border-t border-b"
          href="https://www.youtube.com/c/ggbb528"
        >
          <FontAwesomeIcon icon={faYoutube} size={'2xl'} color={'#ff0000'} />
        </Button>
        <Button
          className="border rounded-r"
          href="https://www.facebook.com/JeffeRy0821"
        >
          <FontAwesomeIcon icon={faFacebook} size={'2xl'} color={'#4267b2'} />
        </Button>
      </div>
    </div>
  );
}
