/* eslint-disable no-unused-vars */
const NOTIFICATION_TYPE = "notification";
const LOG_TYPE = "log";
const DB_NAME = "customer_db";

class Customer {
  constructor(dbName) {
    this.dbName = dbName;
    if (!window.indexedDB) {
      window.alert(
        "Your browser doesn't support a stable version of IndexedDB. \
          Such and such feature will not be available."
      );
    }
  }

  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log(
        "removeAllRows - Database error: ",
        event.target.error.code,
        " - ",
        event.target.error.message
      );
    };

    request.onsuccess = (event) => {
      console.log("Deleting all customers...");
      const db = event.target.result;
      const txn = db.transaction("customers", "readwrite");
      txn.onerror = (event) => {
        console.log(
          "removeAllRows - Txn error: ",
          event.target.error.code,
          " - ",
          event.target.error.message
        );
      };
      txn.oncomplete = (event) => {
        console.log("All rows removed!");
      };
      const objectStore = txn.objectStore("customers");
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach((key) => {
          objectStore.delete(key);
        });
      };
    };
  };

  /**
   * Populate the Customer database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
  initialLoad = (customerData, addMessageTo) => {
    addMessageTo(LOG_TYPE, "Load the Customers database");
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      addMessageTo(
        LOG_TYPE,
        `initialLoad - Database error: ${event.target.error.code} - ${event.target.error.message}`
      );
    };

    request.onupgradeneeded = (event) => {
      addMessageTo(LOG_TYPE, "Populating customers...");
      const db = event.target.result;
      const objectStore = db.createObjectStore("customers", {
        keyPath: "userid",
      });
      objectStore.onerror = (event) => {
        addMessageTo(
          LOG_TYPE,
          `initialLoad - objectStore error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };

      // Create an index to search customers by name and email
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });

      // Populate the database with the initial set of rows
      customerData.forEach(function (customer) {
        objectStore.put(customer);
      });
      db.close();
      addMessageTo(NOTIFICATION_TYPE, "DB load is finished.");
    };

    addMessageTo(NOTIFICATION_TYPE, "Loading the database...");
  };

  /**
   * Queries all rows from the database
   * @memberof Customer
   */
  queryAllRows = (addMessageTo, setResults) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      addMessageTo(
        LOG_TYPE,
        `queryAllRows - Database error: ${event.target.error.code} - ${event.target.error.message}`
      );
    };

    request.onsuccess = (event) => {
      addMessageTo(NOTIFICATION_TYPE, "Retrieving all customers...");
      const db = event.target.result;
      const txn = db.transaction("customers", "readonly");

      txn.onerror = (event) => {
        addMessageTo(
          LOG_TYPE,
          `queryAllRows - Txn error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };

      txn.oncomplete = (event) => {
        addMessageTo(NOTIFICATION_TYPE, "All rows retrieved!");
      };

      const objectStore = txn.objectStore("customers");
      const getAllResultsRequest = objectStore.getAll();

      getAllResultsRequest.onsuccess = (event) => {
        const results = [];
        getAllResultsRequest.result.forEach((row) => {
          results.push({ message: JSON.stringify(row) });
        });
        setResults(results);
      };

      getAllResultsRequest.onerror = (event) => {
        addMessageTo(
          LOG_TYPE,
          `getAllKeysRequest - Database error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };
    };
  };
}

/**
 * Clear all customer data from the database
 */
export const clearDB = () => {
  console.log("Delete all rows from the Customers database");
  let customer = new Customer(DB_NAME);
  customer.removeAllRows();
};

const currentDateAndTime = () => {
  let currentdate = new Date();
  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
};

/**
 * Add customer data to the database
 */
export const loadDB = (addNotification, addLog) => {
  // Customers to add to initially populate the database with
  const customerData = [
    { userid: "444", name: "Bill", email: "bill@company.com" },
    { userid: "555", name: "Donna", email: "donna@home.org" },
  ];
  let customer = new Customer(DB_NAME);
  customer.initialLoad(customerData, (type, message) => {
    if (type === "notification") {
      addNotification({ message, time: currentDateAndTime() });
    } else if (type === "log") {
      addLog({ message, time: currentDateAndTime() });
    }
  });
};

/**
 * Query customer data from the database
 */
export const queryDB = (addNotification, addLog, setResults) => {
  let customer = new Customer(DB_NAME);
  customer.queryAllRows((type, message) => {
    if (type === "notification") {
      addNotification({ message, time: currentDateAndTime() });
    } else if (type === "log") {
      addLog({ message, time: currentDateAndTime() });
    }
  }, setResults);
};
