const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getDashboard() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Dashboard data fetch failed");
  }

  return data;
}

export async function customerAI(question) {
  const token = localStorage.getItem("customerToken");

  const response = await fetch(
    `${API_URL}/customer/ask_question`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "AI response failed");
  }

  return data;
}

export async function getMyOrders() {
  const token = localStorage.getItem("customerToken");

  const response = await fetch(`${API_URL}/getMyOrders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Orders fetch failed");
  }

  return data;
}

export async function getAllOrders() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/getorder`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Orders fetch failed");
  }

  return data;
}

export async function updateOrderStatus(orderId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/updateStatusOrder/${orderId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order status update failed");
  }

  return data;
}

export async function getAllMenu() {
  const response = await fetch(`${API_URL}/getmenu`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Menu fetch failed");
  }

  return data;
}

export async function createMenu(menuData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", menuData.name);
  formData.append("description", menuData.description);
  formData.append("price", menuData.price);
  formData.append("category", menuData.category);
  formData.append("isAvailable", menuData.isAvailable);

  if (menuData.image) {
    formData.append("image", menuData.image);
  }

  const response = await fetch(`${API_URL}/createmenu`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Menu creation failed");
  }

  return data;
}

export async function updateMenu(menuId, menuData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/updatemenu/${menuId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menuData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Menu update failed");
  }

  return data;
}

export async function deleteMenu(menuId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/deletemenu/${menuId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Menu delete failed");
  }

  return data;
}

// TABLES

export async function getAllTables() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/gettable`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Tables fetch failed");
  }

  return data;
}

export async function createTable(tableData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tablecreate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tableData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Table creation failed");
  }

  return data;
}

export async function updateTable(tableId, tableData) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/updatetable/${tableId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tableData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Table update failed");
  }

  return data;
}

export async function deleteTable(tableId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/deletetable/${tableId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Table deletion failed");
  }

  return data;
}

// PAYMENTS

export async function getAllPayments() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/getpayments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payments fetch failed");
  }

  return data;
}

export async function approvePayment(paymentId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/updatepayment/${paymentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payment approval failed");
  }

  return data;
}

// CUSTOMERS

export async function getAllCustomers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/getcustomers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("GET CUSTOMERS RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data.error || data.message || "Customers fetch failed"
    );
  }

  return data;
}

export async function createCustomer(customerData) {
  const response = await fetch(`${API_URL}/createcustomer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Customer registration failed"
    );
  }

  return data;
}