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
  removeAllRows = (addMessageTo) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      addMessageTo(
        LOG_TYPE,
        `initialLoad - Database error: ${event.target.error.code} - ${event.target.error.message}`
      );
    };

    request.onsuccess = (event) => {
      console.log("Deleting all customers...");
      const db = event.target.result;
      const txn = db.transaction("customers", "readwrite");
      txn.onerror = (event) => {
        addMessageTo(
          LOG_TYPE,
          `initialLoad - Txn error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };
      txn.oncomplete = (event) => {
        addMessageTo(NOTIFICATION_TYPE, "Remove operation complete.");
      };
      const objectStore = txn.objectStore("customers");
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach((key) => {
          objectStore.delete(key);
        });
      };
    };

    addMessageTo(NOTIFICATION_TYPE, "Removing all rows...");
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

    request.onsuccess = (event) => {
      addMessageTo(LOG_TYPE, "Populating customers...");
      const db = event.target.result;
      const transaction = db.transaction(["customers"], "readwrite");
      const objectStore = transaction.objectStore("customers");
      customerData.forEach((customer) => {
        objectStore.add(customer);
      });
      addMessageTo(NOTIFICATION_TYPE, "DB load is finished.");
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
export const clearDB = (addNotification, addLog) => {
  console.log("Delete all rows from the Customers database");
  let customer = new Customer(DB_NAME);
  customer.removeAllRows((type, message) => {
    if (type === "notification") {
      addNotification({ message, time: currentDateAndTime() });
    } else if (type === "log") {
      addLog({ message, time: currentDateAndTime() });
    }
  });
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
    {
      userid: "444",
      name: "Bill",
      email: "bill@company.com",
      lastOrderDate: "2023-12-15",
      totalSalesYear: 5000,
    },
    {
      userid: "555",
      name: "Donna",
      email: "donna@home.org",
      lastOrderDate: "2023-11-20",
      totalSalesYear: 7000,
    },
    {
      userid: "666",
      name: "John",
      email: "john@example.com",
      lastOrderDate: "2023-12-31",
      totalSalesYear: 10000,
    },
    {
      userid: "777",
      name: "Alice",
      email: "alice@example.com",
      lastOrderDate: "2023-12-25",
      totalSalesYear: 8000,
    },
    {
      userid: "888",
      name: "Bob",
      email: "bob@example.com",
      lastOrderDate: "2023-10-10",
      totalSalesYear: 6000,
    },
    {
      userid: "999",
      name: "Emily",
      email: "emily@example.com",
      lastOrderDate: "2023-09-15",
      totalSalesYear: 9000,
    },
    {
      userid: "1010",
      name: "Michael",
      email: "michael@example.com",
      lastOrderDate: "2023-11-05",
      totalSalesYear: 12000,
    },
    {
      userid: "1111",
      name: "Jessica",
      email: "jessica@example.com",
      lastOrderDate: "2023-08-20",
      totalSalesYear: 11000,
    },
    {
      userid: "1212",
      name: "David",
      email: "david@example.com",
      lastOrderDate: "2023-07-30",
      totalSalesYear: 15000,
    },
    {
      userid: "1313",
      name: "Sarah",
      email: "sarah@example.com",
      lastOrderDate: "2023-12-10",
      totalSalesYear: 20000,
    },
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
