const CAMPUS_MAPPING = {
  "west-lafayette": "West Lafayette",
  "fort-wayne": "Fort Wayne",
  global: "Global",
  northwest: "Northwest",
};

function autoclick(campus) {
  const d2l_block = document.querySelector("d2l-html-block");
  try {
    const campus_button = d2l_block.shadowRoot.querySelectorAll(
      `a[title*="${CAMPUS_MAPPING[campus]}"]`
    );
    if (campus_button[0]) {
      campus_button[0].click();
    } else {
      console.error(
        "Failed to find the campus button! Maybe the layout changed?"
      );
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(
        "Shadow DOM not found, page not fully loaded yet. Retrying..."
      );
      setTimeout(() => {
        autoclick(campus);
      }, 1000);
    } else {
      throw error;
    }
  }
}

function on_pref_fetch_error(error) {
  console.log(`Error: ${error}`);
}

function on_pref_fetch(item) {
  let campus = "west-lafayette";
  if (item.campus) {
    campus = item.campus;
  }
  autoclick(campus);
}

// Patch for Chrome not playing nice
if (typeof browser === "undefined") {
  var browser = chrome;
}

// Load saved campus preference
const campus_pref = browser.storage.sync.get("campus");
campus_pref.then(on_pref_fetch, on_pref_fetch_error);
