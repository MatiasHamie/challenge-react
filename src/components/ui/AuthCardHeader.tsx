import logoSantander from "../../assets/img/santander.png";
import spanishFlag from "../../assets/img/spain.png";
import englishFlag from "../../assets/img/english.png";
import { useTranslation } from "react-i18next";

export const CardHeader: React.FC = () => {
  const { i18n } = useTranslation("global");
  return (
    <div className="card-header d-flex justify-content-around align-items-center">
      <img src={logoSantander} alt="LogoSantander" />
      <img
        className="language_img"
        src={spanishFlag}
        alt="spanish flag"
        onClick={() => i18n.changeLanguage("es")}
      />
      <img
        className="language_img"
        src={englishFlag}
        alt="english flag"
        onClick={() => i18n.changeLanguage("en")}
      />
    </div>
  );
};
