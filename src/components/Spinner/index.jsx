import styles from "./styles.module.css";

function Spinner() {
  const isColorModeLight =
    localStorage.getItem("chakra-ui-color-mode") === "light" ||
    !localStorage.getItem("chakra-ui-color-mode");

  return (
    <div
      className={styles.loaderContainer}
      style={{
        backgroundColor: isColorModeLight ? "#EDF2F7" : "#171923",
      }}
    >
      <span
        className={styles.loader}
        style={{ "--border-color": isColorModeLight ? "#171923" : "#EDF2F7" }}
      />
    </div>
  );
}

export default Spinner;
