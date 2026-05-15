const inputStyle = "w-full p-3 rounded-lg border outline-none transition bg-[#F4F1DE] text-[#3D405B] border-[#F2CC8F]";
const selectStyle = inputStyle + " appearance-auto";

document.querySelectorAll(".field").forEach(field => {
      field.className = field.classList.contains("select-field") ? selectStyle : inputStyle;
    });