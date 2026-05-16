const inputStyle = "w-full p-3 rounded-lg border outline-none transition bg-[#F4F1DE] text-[#3D405B] border-[#F2CC8F]";
const selectStyle = inputStyle + " appearance-auto";

document.querySelectorAll(".field").forEach(field => {
      field.className = field.classList.contains("select-field") ? selectStyle : inputStyle;
    });


document.getElementById("searchBtn").addEventListener("click", searchJobs);
document.getElementById("customBoard").addEventListener("input", toggleBoardDropdown);

function toggleBoardDropdown() {
  const boardSelect = document.getElementById("board");
  const hasCustomDomain =
    document.getElementById("customBoard").value.trim() !== "";

  boardSelect.disabled = hasCustomDomain;

  boardSelect.classList.toggle("opacity-50", hasCustomDomain);
  boardSelect.classList.toggle("cursor-not-allowed", hasCustomDomain);
}


function getValue(id) {
    return document.getElementById(id).value.trim();
}