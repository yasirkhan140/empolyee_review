var close = document.querySelector("#toast");
const hideToast = () => {
  close.style.display = "none";
};

const addEmployeeModal = document.getElementById("add-employee-modal");

const hideUnhideModal = () => {
  if (
    Object.values(addEmployeeModal.classList)?.some((item) => item === "hidden")
  ) {
    addEmployeeModal.classList.remove("hidden");
    addEmployeeModal.classList.add("flex");
  } else {
    addEmployeeModal.classList.add("hidden");
    addEmployeeModal.classList.remove("flex");
  }
};
