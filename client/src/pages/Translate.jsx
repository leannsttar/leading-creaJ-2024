import React, { useEffect, useState } from "react";

const Translate = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'auto',
          includedLanguages: "en,es,de,ja,fr,it,pt,zh-CN,hi,ru,el,no",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    } else {
      console.error('Google Translate no está cargado correctamente.');
    }
  };

  useEffect(() => {
    const translateDiv = document.createElement("div");
    translateDiv.id = "google_translate_element";
    translateDiv.style.display = "none";
    document.body.appendChild(translateDiv);

    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Estilizar el select después de un breve retraso
    setTimeout(styleAndCleanupTranslator, 1000);

    return () => {
      document.body.removeChild(translateDiv);
      document.body.removeChild(addScript);
    };
  }, []);

  const styleAndCleanupTranslator = () => {
    const container = document.querySelector('.goog-te-gadget-simple');
    if (container) {
      const selectElement = container.querySelector('.goog-te-combo');
      if (selectElement) {
        // Añadir opción "No traducir"
        const noTranslateOption = document.createElement('option');
        noTranslateOption.value = '';
        noTranslateOption.textContent = "No traducir";
        selectElement.prepend(noTranslateOption);

        // Listener para manejar la opción "No traducir"
        selectElement.addEventListener('change', (event) => {
          if (event.target.value === '') {
            // Restablecer la página a su idioma original
            window.location.reload();
          }
        });

        // Cambiar el texto "Select Language" a "Seleccionar idioma"
        const defaultOption = selectElement.querySelector('option');
        if (defaultOption) {
          defaultOption.textContent = "Seleccionar idioma";
        }
      }

      // Remover elementos duplicados
      const elements = container.querySelectorAll('.VIpgJd-ZVi9od-xl07Ob-lTBxed');
      if (elements.length > 1) {
        for (let i = 1; i < elements.length; i++) {
          elements[i].remove();
        }
      }

      // Estilizar el contenedor
      container.style.border = 'none';
      container.style.padding = '8px';
      container.style.borderRadius = '4px';
      container.style.backgroundColor = '#f0f0f0';
      container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

      // Estilizar el enlace
      const link = container.querySelector('.VIpgJd-ZVi9od-xl07Ob-lTBxed');
      if (link) {
        link.style.color = '#333';
        link.style.textDecoration = 'none';
        link.style.fontSize = '14px';
        link.style.fontWeight = 'bold';
      }

      // Ocultar el icono de Google
      const icon = container.querySelector('.goog-te-gadget-icon');
      if (icon) {
        icon.style.display = 'none';
      }
    }
  };

  const toggleTranslator = () => {
    setIsVisible(!isVisible);
    setTimeout(styleAndCleanupTranslator, 100);
  };

  return (
    <>
      {children}
      <div
        className={`fixed bottom-16 right-4 z-50 bg-white rounded-lg shadow-lg transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ padding: '12px' }}
      >
        <div id="google_translate_element"></div>
      </div>
      <button
        onClick={toggleTranslator}
        className="fixed bottom-4 pl-3 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        style={{ width: '48px', height: '48px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </button>
    </>
  );
};

export default Translate;
