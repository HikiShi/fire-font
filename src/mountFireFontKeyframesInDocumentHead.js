const keyframesPrefixes = ["-webkit-", "-o-", "-moz-", ""];

export const firefontKeyframesName = "fire_front_keyframes";

const getKeyFramesWithPrefix = (prefix) => `
    @${prefix}keyframes ${firefontKeyframesName} {
        from {
            transform: perspective(500px) translateX(100vw) scale3d(1, 1, 10) rotateY(0deg);
        }

        10% {
            transform: perspective(500px) translateX(90vw) scale3d(1, 1, 10) rotateY(0deg);
        }


        20% {
            transform: perspective(500px) translateX(80vw) scale3d(1, 1, 10) rotateY(0deg);
        }

        30% {
            transform: perspective(500px) translateX(70vw) scale3d(3, 3, 10) rotateY(45deg);
        }

        40%{
            transform: perspective(500px) translateX(60vw) scale3d(6, 6, 10) rotateY(90deg);
        }


        50% {
            transform: perspective(500px) translateX(50vw) scale3d(10, 10, 10) rotateY(180deg);
        }

        to {
            transform: perspective(500px) translateX(0px) scale3d(1, 1, 10) rotateY(360deg);
        }
   }
`;

const fireFontkeyfraems = keyframesPrefixes
  .map(getKeyFramesWithPrefix)
  .join("\n");

const mountStylesInDocumentHead = (cssText) => {
  const styleElement = document.createElement("style");

  styleElement.appendChild(document.createTextNode(cssText));
  document.getElementsByTagName("head")[0].appendChild(styleElement);
};

mountStylesInDocumentHead(fireFontkeyfraems);
