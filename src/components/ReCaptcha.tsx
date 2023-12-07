import { useRef, createContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const ReCaptchaContext = createContext<ReCAPTCHA | null>(null);

export default function ReCaptcha() {
  // reCAPTCHA v2 (invisible)
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <ReCaptchaContext.Provider value={reCaptchaRef.current}>
      <ReCAPTCHA
        // style={{ display: "none" }}
        ref={reCaptchaRef}
        size="invisible"
        sitekey={
          import.meta.env.DEV
            ? import.meta.env.VITE_FIREBASE_APPCHECK_DEV_PUBLIC_KEY
            : import.meta.env.VITE_FIREBASE_APPCHECK_PUBLIC_KEY
        }
      />
    </ReCaptchaContext.Provider>
  );
}

/* Usage: const VALUE_NAME = useContext(ReCaptchaContext); */
