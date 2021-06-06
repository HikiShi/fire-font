import { measureTextWidthInStyleContext } from "./measureTextWidthInStyleContext";
import { firefontKeyframesName } from "./mountFireFontKeyframesInDocumentHead";

export default makeSuperFireFontFromSimpleElementWithPlaneText = (
  textElement
) => {
  const textToFire = getTextFromElement(textElement);
  const textElementStyles = getElementStyles(textElement);

  clearTextInElement(textElement);

  Array.from(textToFire).forEach((symbol, symbolNumber) => {
    const fireSymbol = getFireSymbol({
      symbol,
      symbolNumber,
      styles: textElementStyles,
    });

    textElement.appendChild(fireSymbol);
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
  styles,
}) => {
  const symbolWidth = measureTextWidthInStyleContext({ text: symbol, styles });

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
};

const createSymbolContainer = ({ symbol, styles, symbolNumber }) => {
  const symbolContainerElement = document.createElement("div");
  assignSymbolSymbolContainerStyles({
    symbolContainerElement,
    symbol,
    symbolNumber,
    styles,
  });

  return symbolContainerElement;
};

const addFireSymbolsInContainer = ({ symbolConainer, symbol, styles }) => {
  const numberOfSymbolLayer = 10;
  // comments sucks
  const theNumberObtainedEmpiricallyIsTheRatioOfTheFontSizeToTheThicknessOfTheResultingSymbolFromTheLayer = 0.0042;

  for (let i = 0; i < numberOfSymbolLayer; i++) {
    const symbolElem = document.createElement("span");
    symbolElem.innerText = symbol;

    symbolConainer.appendChild(symbolElem);
    symbolElem.style.position = "absolute";
    symbolElem.style.transform = `translateZ(${
      i *
      (Number.parseInt(styles.fontSize, 10) *
        theNumberObtainedEmpiricallyIsTheRatioOfTheFontSizeToTheThicknessOfTheResultingSymbolFromTheLayer)
    }px)`;
  }
};

const createFireSymbol = ({ symbol, symbolNumber, styles }) => {
  const symbolConainer = createSymbolContainer({
    symbol,
    symbolNumber,
    styles,
  });

  addFireSymbolsInContainer({ symbolConainer, symbol, styles });

  return symbolConainer;
};

const createEmptySymbol = () => {
  const symbolElem = document.createElement("span");
  symbolElem.innerText = " ";

  return symbolElem;
};

const getFireSymbol = ({ symbol, symbolNumber, styles }) => {
  if (symbol === " ") {
    return createEmptySymbol();
  }

  return createFireSymbol({ symbol, symbolNumber, styles });
};

const getElementStyles = (textElement) => window.getComputedStyle(textElement);
