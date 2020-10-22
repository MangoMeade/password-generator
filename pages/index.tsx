import Head from "next/head";
import { useReducer, useRef, Dispatch, useEffect, useState } from "react";
import { getType, randomString } from "../utils/utils";
// import Button from '@material-ui/core/Button';
import { MdContentCopy, MdFormatColorText } from "react-icons/md";

interface StateObj {
  passwordLength: number;
  password: string;
  upperCaseAllowed: boolean;
  lowerCaseAllowed: boolean;
  numbersAllowed: boolean;
  symbolsAllowed: boolean;
  duplicatesAllowed: boolean;
}

const initialState = {
  passwordLength: 10,
  password: "",
  upperCaseAllowed: true,
  lowerCaseAllowed: true,
  numbersAllowed: true,
  symbolsAllowed: true,
  duplicatesAllowed: true,
};

function reducer(state, action): StateObj {
  if (action.type === "writeText") {
    const { payload } = action;

    return {
      ...state,
      password: payload,
    };
  } else if (action.type === "changePasswordLength") {
    const { payload } = action;

    return {
      ...state,
      passwordLength: payload,
    };
  } else if (action.type === "changeProperty") {
    const { property: propertyToBeChanged } = action.payload;
    return {
      ...state,
      [propertyToBeChanged]: !state[propertyToBeChanged],
    };
  } else {
    throw new Error();
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    // console.log("gettype", getType());
    // console.log("rand", randomString(state));
    const passwordGenerated = randomString(state);
    dispatch({ type: "writeText", payload: passwordGenerated });
  }, []);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  const onChangeCheckBox = (property) => {
    dispatch({ type: "changeProperty", payload: { property } });
  };

  const onChangePasswordLength = (e) => {
    dispatch({
      type: "changePasswordLength",
      payload: parseInt(e.target.value),
    });
  };

  const onGeneratePassword = () => {
    const passwordGenerated = randomString(state);
    dispatch({ type: "writeText", payload: passwordGenerated });
  };
  console.log("st", state);
  return (
    <>
      <Head>
        <title>Generador de Contraseñas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-300 p-4 flex justify-between items-center text-gray-700">
          <div className="flex items-center">
            <MdFormatColorText size={50} /> Generador de Contraseñas
          </div>
          <div className="hidden md:block"></div>
        </header>
        <main className="flex-grow lg:mx-56 mx-5">
          <div className="container mx-auto my-5">
            <div className=" my-10 h-auto  shadow-md items-center rounded">
              <h1 className="font-bold ml-2 px-5 pt-5 text-gray-900">
                Nueva contraseña
              </h1>
              <div className="mx-1">
                <input
                  className="w-full h-10 focus:outline-none mb-3
                
                bg-gray-200 appearance-none border-2 
                      border-gray-200 rounded py-2 px-4 
                      text-gray-700 leading-tight  focus:bg-white focus:border-pink-600
                "
                  type="text"
                  value={state.password}
                  name="textAreaWordCount"
                  onChange={(e) =>
                    dispatch({ type: "writeText", payload: e.target.value })
                  }
                  placeholder="Contraseña..."
                  ref={textAreaRef}
                ></input>
              </div>
            </div>
          </div>
          <div className="container mx-auto my-5">
            <div className="container my-10 h-auto  w-auto shadow-md items-center rounded">
              <h1 className="font-bold ml-2 px-5 pt-5 text-gray-900">
                Gestionar propiedades de la contraseña
              </h1>
              <div className="w-full h-full p-5 md:flex">
                <div className="w-2/4">
                  <div className="">
                    <label
                      className="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Numero de caracteres
                    </label>
                  </div>
                  <div className="w-full md:w-2/3 lg:w-2/4">
                    <input
                      className="
                      bg-gray-200 appearance-none border-2 
                      border-gray-200 rounded w-full py-2 px-4 
                      text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-600
                      "
                      id="inline-full-name"
                      type="number"
                      value={state.passwordLength}
                      onChange={(e) => onChangePasswordLength(e)}
                    />
                  </div>
                </div>
                <div className="flex justify-between md:w-4/6">
                  <div>
                    <div>
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600"
                          checked={state.upperCaseAllowed}
                          onChange={() => onChangeCheckBox("upperCaseAllowed")}
                        />
                        <span className="ml-2 text-gray-500 font-bold">
                          Letras mayusculas
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600"
                          checked={state.lowerCaseAllowed}
                          onChange={() => onChangeCheckBox("lowerCaseAllowed")}
                        />
                        <span className="ml-2 text-gray-500 font-bold">
                          Letras minusculas
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600"
                          checked={state.numbersAllowed}
                          onChange={() => onChangeCheckBox("numbersAllowed")}
                        />
                        <span className="ml-2 text-gray-500 font-bold">
                          Numeros
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600"
                          checked={state.symbolsAllowed}
                          onChange={() => onChangeCheckBox("symbolsAllowed")}
                        />
                        <span className="ml-2 text-gray-500 font-bold">
                          Simbolos
                        </span>
                      </label>
                    </div>
                    {/* <div>
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600"
                          checked={state.duplicatesAllowed}
                          onChange={() => onChangeCheckBox("duplicatesAllowed")}
                        />
                        <span className="ml-2 text-gray-500 font-bold">
                          Duplicar caracteres
                        </span>
                      </label>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto my-5 justify-end flex font-bold">
            <MdContentCopy size={50} onClick={copyToClipboard} className='cursor-pointer'/>
            {/* <button
              className="inline-block py-1 px-2 text-white bg-pink-600 hover:bg-pink-300 hover:text-white rounded transition ease-in duration-150 font-bold"
              // onClick={() => dispatch({ type: "deleteText" })}
              onClick={copyToClipboard}
            >
              Copiar al  Contraseña
            </button> */}
            <button
              className="ml-1 inline-block py-1 px-2 text-white bg-pink-600 hover:bg-pink-300 hover:text-white rounded transition ease-in duration-150 font-bold"
              onClick={onGeneratePassword}
            >
              Generar Contraseña
            </button>
          </div>
          <div className="container mx-auto my-5 justify-between flex font-bold">
            <div className="justify-evenly">
              <p className="mx-1">Numero de palabras: {state.wordCount}</p>
              <p className="mx-1">
                Numero de caracteres: {state.charactersCount}
              </p>
            </div>
            {/* <div className="justify-evenly">
              <button
                className="inline-block py-1 px-2 text-white bg-pink-600 hover:bg-pink-300 hover:text-white rounded transition ease-in duration-150 font-bold"
                onClick={() => dispatch({ type: "deleteText" })}
              >
                Borrar Texto
              </button>
            </div> */}
          </div>
          <div className="container mx-auto my-5">
            <h3 className="font-bold">Como usar el Contador de Palabras?</h3>
            <p>
              Contador de palabras es una aplicacion creada para contar el
              numero de palabras y el numero de caracteres que tiene un texto.
              Para usar la aplicacion solamente tienes que escribir en el area
              de texto y la aplicacion te mostrara cuantas palabras y caracteres
              tiene lo que has escrito. Usa el boton de Borrar para para
              comenzar de nuevo.
            </p>
          </div>
        </main>
        <footer className="h-10 bg-pink-600 flex justify-end">
          <p className="mx-2 my-0 leading-10"></p>
        </footer>
      </div>
    </>
  );
}
