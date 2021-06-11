import { measureTextWidthInStyleContext } from "./measureTextWidthInStyleContext";
import { firefontKeyframesName } from "./mountFireFontKeyframesInDocumentHead";



function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export default makeSuperFireFontFromSimpleElementWithPlaneText = (
  targetElementWithTextNode
) => {
  const textToFire = getTextFromElement(targetElementWithTextNode);

  clearTextInElement(targetElementWithTextNode);

  Array.from(textToFire).forEach((symbol, symbolNumber) => {
    const fireSymbol = getFireSymbol({
      symbol,
      symbolNumber,
      rootElement: targetElementWithTextNode
    });

    targetElementWithTextNode.appendChild(fireSymbol);
  });
};

const getTextFromElement = (textElement) => textElement.innerText;

const clearTextInElement = (textElement) => {
  textElement.innerText = "";
};

const assignSymbolSymbolContainerStyles = ({
  symbolContainerElement,
  symbol,
  symbolNumber,
  rootElement
}) => {
  const symbolWidth = measureTextWidthInStyleContext({ text: symbol, styles: getElementStyles(rootElement) });

  Object.assign(symbolContainerElement.style, {
    width: `${symbolWidth}px`,
    height: "1em",
    display: "inline-block",
    "will-change": "transform",
    transform: "translateX(100vw)",
    animation: `${firefontKeyframesName} 3s linear forwards`,
    position: "relative",
    "transform-style": "preserve-3d",
    "transform-origin": "center",
    animationDelay: `${symbolNumber * 0.5}s`,
  });


   const rootElemnetResizeObserver = new ResizeObserver(debounce(() => {
      const symbolWidthAfterResize = measureTextWidthInStyleContext({ text: symbol, styles: getElementStyles(rootElement) });
      
      symbolContainerElement.style.width = `${symbolWidthAfterResize}px`;
   }, 500));

   rootElemnetResizeObserver.observe(rootElement);
};

const createSymbolContainer = ({ symbol, rootElement, symbolNumber }) => {
  const symbolContainerElement = document.createElement("div");
  assignSymbolSymbolContainerStyles({
    symbolContainerElement,
    symbol,
    symbolNumber,
    rootElement
  });


  return symbolContainerElement;
};

const addFireSymbolsInContainer = ({ symbolConainer, symbol, rootElement }) => {
  const numberOfSymbolLayer = 10;
  // comments sucks
  const theNumberObtainedEmpiricallyIsTheRatioOfTheFontSizeToTheThicknessOfTheResultingSymbolFromTheLayer = 0.0042;

  for (let i = 0; i < numberOfSymbolLayer; i++) {
    const symbolElem = document.createElement("span");
    symbolElem.innerText = symbol;
    
    symbolConainer.appendChild(symbolElem);
    symbolElem.style.position = "absolute";
    symbolElem.style.transform = `translateZ(calc(1em * ${
      i * theNumberObtainedEmpiricallyIsTheRatioOfTheFontSizeToTheThicknessOfTheResultingSymbolFromTheLayer
   }))`;
  }
};

const createFireSymbol = ({ symbol, symbolNumber, rootElement }) => {
  const symbolConainer = createSymbolContainer({
    symbol,
    symbolNumber,
    rootElement
  });

  addFireSymbolsInContainer({ symbolConainer, symbol, rootElement });

  return symbolConainer;
};

const createEmptySymbol = () => {
  const symbolElem = document.createElement("span");
  symbolElem.innerText = " ";

  return symbolElem;
};

const getFireSymbol = ({ symbol, symbolNumber, rootElement }) => {
  if (symbol === " ") {
    return createEmptySymbol();
  }

  return createFireSymbol({ symbol, symbolNumber, rootElement });
};

const getElementStyles = (textElement) => window.getComputedStyle(textElement);



