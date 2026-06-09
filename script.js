const inputStyle =
  "w-full p-3 rounded-lg border outline-none transition bg-[#F4F1DE] text-[#3D405B] border-[#F2CC8F]";
const selectStyle = inputStyle + " appearance-auto";

document.querySelectorAll(".field").forEach((field) => {
  field.className = field.classList.contains("select-field")
    ? selectStyle
    : inputStyle;
});

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  searchJobs();
});
document
  .getElementById("customBoard")
  .addEventListener("input", toggleBoardDropdown);

function toggleBoardDropdown() {
  const boardSelect = document.getElementById("board");
  const hasCustomDomain =
    document.getElementById("customBoard").value.trim() !== "";

  boardSelect.disabled = hasCustomDomain;

  boardSelect.classList.toggle("opacity-50", hasCustomDomain);
  boardSelect.classList.toggle("cursor-not-allowed", hasCustomDomain);
}

function searchJobs() {
  const role = getValue("role");
  const timePosted = getValue("timePosted");
  const exactMatch = document.getElementById("exactMatch").checked;
  const remoteOnly = document.getElementById("remoteOnly").checked;
  const customBoard = getValue("customBoard").replace(/^https?:\/\//, "");

  if (!role) {
    alert("Enter a role.");
    return;
  }

  if (customBoard && !isValidDomain(customBoard)) {
    alert(
      "Custom board domain looks invalid. Enter a domain like myboard.com or myboard.com/jobs.",
    );
    return;
  }

  const board = customBoard || getValue("board");
  const query = buildSearchQuery({
    role,
    board,
    exactMatch,
    remoteOnly,
    exclude: getValue("exclude"),
  });
  const url = buildGoogleUrl(query, timePosted);
  window.open(url, "_blank", "noopener,noreferrer");
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function buildSearchQuery({ role, board, exactMatch, remoteOnly, exclude }) {
  const sanitizedRole = role.replace(/"/g, "");
  const roleQuery = exactMatch ? `"${sanitizedRole}"` : sanitizedRole;
  const remoteQuery = remoteOnly ? "(remote OR distributed)" : "";
  const excludeQuery = formatExcludedWords(exclude);

  return `
      ${roleQuery}
      site:${board}
      (job OR careers OR apply)
      ${remoteQuery}
      ${excludeQuery}
    `
    .replace(/\s+/g, " ")
    .trim();
}

function formatExcludedWords(excludeText) {
  return excludeText
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) => `-${word}`)
    .join(" ");
}

function isValidDomain(value) {
  return /^[\w.-]+(\/[\w./-]*)?$/.test(value);
}

function buildGoogleUrl(query, timePosted) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}&tbs=${timePosted}`;
}
