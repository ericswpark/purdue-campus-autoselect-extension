const CAMPUS_MAPPING = {
  "west-lafayette": "West Lafayette",
  "fort-wayne": "Fort Wayne",
  global: "Global",
  northwest: "Northwest",
};

const ICLICKER_CAMPUS_MAPPING = {
  "west-lafayette": "Purdue University West Lafayette/Indianapolis",
  northwest: "Purdue University Northwest"
}

function autoclick(campus) {
  const url = window.location.href;
  
  if (url.startsWith("https://purdue.brightspace.com")) {
    autoclick_brightspace(campus);
  }
  else if (url === "https://student.iclicker.com/#/login") {
    autoclick_iclicker(campus);
  }
}

function autoclick_brightspace(campus) {
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
        autoclick_brightspace(campus);
      }, 1000);
    } else {
      throw error;
    }
  }
}

class IncompleteLoadError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.name = IncompleteLoadError.name;
  }
}


function autoclick_iclicker(campus) {
  const iclicker_fed_list = document.querySelector("select[id='federationList']");

  if (!ICLICKER_CAMPUS_MAPPING.hasOwnProperty(campus)) {
    console.warn("Your campus is not one of the supported options for iClicker autoloading.");
    return;
  }

  try {
    const purdue_campus_option = Array.from(iclicker_fed_list.querySelectorAll("option")).find(o => o.text === ICLICKER_CAMPUS_MAPPING[campus]);
    console.log(purdue_campus_option);
    iclicker_fed_list.value = purdue_campus_option.value;

    // Trigger change event to enable redirect button
    var change_event = new Event('change');
    iclicker_fed_list.dispatchEvent(change_event);

    document.querySelector("div[class='institution-redirect'] button").click();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(
        `Unable to find the campus option; page may not be fully loaded yet. Retrying...`
      );
      setTimeout(() => {
        autoclick_iclicker(campus);
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
