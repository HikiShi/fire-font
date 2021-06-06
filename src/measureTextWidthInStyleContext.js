const mountElementInDocumentBody = (element) =>
  document.getElementsByTagName("body")[0].appendChild(element);

const removeElementFromDOM = (element) => element.remove();

const mountTemporaryElementForMeasurementInDocumentBody = () => {
  const elementForMeasurement = document.createElement("div");
  mountElementInDocumentBody(elementForMeasurement);

  return elementForMeasurement;
};

const assignStylesForMeasurementOnElement = ({ targetElement, styles }) => {
  for (const stylePropertyName in styles) {
    targetElement.style.setProperty(
      stylePropertyName,
      styles.getPropertyValue(stylePropertyName)
    );
  }

  targetElement.style.position = "absolute";
  targetElement.style.height = "auto";
  targetElement.style.width = "auto";
  targetElement.style.display = "block";
  targetElement.style.visibility = "hidden";
  targetElement.style.whiteSpace = "nowrap";
  targetElement.style.padding = "0px";
  targetElement.style.border = "none";
};

const measureTextWidth = ({ elementForMesuarement, text }) => {
  elementForMesuarement.innerText = text;

  return elementForMesuarement.getBoundingClientRect().width;
};

export const measureTextWidthInStyleContext = ({ text, styles }) => {
  const temporaryElementForMeasurement =
    mountTemporaryElementForMeasurementInDocumentBody();

  assignStylesForMeasurementOnElement({
    targetElement: temporaryElementForMeasurement,
    styles,
  });

  const width = measureTextWidth({
    elementForMesuarement: temporaryElementForMeasurement,
    text,
  });

  removeElementFromDOM(temporaryElementForMeasurement);

  return width;
};
