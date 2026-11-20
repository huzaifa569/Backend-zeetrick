// import {
//   addCustomer,
//   CustomerAlreadyExists,
//   GetallCustomer,
//   GetSpecificCustomerById,
//   DeleteByAll,
//   DeleteById,
//   UpdateById,
// } from "../models/addcustomer.js";
// import { uploadToCloudinary } from "../utils/cloudinary.js";

// export const addcustomer = async (req, res) => {
//   try {
//     const { name, email, location, orders, TotalSpent, Tier } = req.body;

//     if (!name || !email || !location || !orders || !TotalSpent || !Tier) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     const allowedTiers = ["VIP", "New", "Regular"];
//     if (!allowedTiers.includes(Tier)) {
//       return res.status(400).json({
//         message: `Tier must be one of: ${allowedTiers.join(", ")}`,
//         success: false,
//       });
//     }

//     let parsedOrders = orders;
//     if (typeof orders === "string") {
//       try {
//         parsedOrders = JSON.parse(orders);
//       } catch {
//       }
//     }
//     const ordersToStore =
//       typeof parsedOrders === "object"
//         ? JSON.stringify(parsedOrders)
//         : parsedOrders;

//     const exists = await CustomerAlreadyExists({ email });
//     if (exists) {
//       return res.status(409).json({
//         message: "Customer already exists",
//         success: false,
//       });
//     }

//     let imageUrl = null;
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer, "customers");
//       imageUrl = result.secure_url;
//     }

//     const customer = await addCustomer({
//       image: imageUrl,
//       name,
//       email,
//       location,
//       orders: ordersToStore,
//       TotalSpent,
//       Tier,
//     });

//     return res.status(201).json({
//       message: "Customer added successfully",
//       success: true,
//       customer,
//       created_at: new Date(),
//     });
//   } catch (error) {
//     console.error("Add Customer Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to add customer",
//     });
//   }
// };

// export const Getallcustomer = async (req, res) => {
//   try {
//     const AllData = await GetallCustomer();

//     if (!AllData || AllData.length === 0) {
//       return res.status(404).json({
//         message: "No customers found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Customers retrieved successfully",
//       success: true,
//       data: AllData,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Failed to retrieve customers",
//       success: false,
//       error: err.message,
//     });
//   }
// };

// export const GetAllSpecificCustomerById = async (req, res) => {
//   try {
//     const data = await GetSpecificCustomerById(req.params.id);

//     if (!data) {
//       return res.status(404).json({
//         message: "Customer not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Customer retrieved successfully",
//       success: true,
//       data,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Failed to retrieve customer",
//       success: false,
//       error: err.message,
//     });
//   }
// };

// export const GetDeleteByAll = async (req, res) => {
//   try {
//     const result = await DeleteByAll();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "No customer data found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "All customers deleted successfully",
//       success: true,
//       deletedCount: result.affectedRows,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to delete customers",
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const GetDeleteById = async (req, res) => {
//   try {
//     const result = await DeleteById(req.params.id);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "Customer not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Customer deleted successfully",
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to delete customer",
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const GetUpdateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, location, orders, TotalSpent, Tier } = req.body;

//     if (!name || !email || !location || !orders || !TotalSpent || !Tier) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     const allowedTiers = ["VIP", "New", "Regular"];
//     if (!allowedTiers.includes(Tier)) {
//       return res.status(400).json({
//         message: `Tier must be one of: ${allowedTiers.join(", ")}`,
//         success: false,
//       });
//     }

//     let parsedOrders = orders;
//     if (typeof orders === "string") {
//       try {
//         parsedOrders = JSON.parse(orders);
//       } catch {
//       }
//     }
//     const ordersToStore =
//       typeof parsedOrders === "object"
//         ? JSON.stringify(parsedOrders)
//         : parsedOrders;

//     let imageUrl = null;
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer, "customers");
//       imageUrl = result.secure_url;
//     }

//     const result = await UpdateById(
//       {
//         image: imageUrl,
//         name,
//         email,
//         location,
//         orders: ordersToStore,
//         TotalSpent,
//         Tier,
//       },
//       id
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "Customer not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Customer updated successfully",
//       success: true,
//       updated_at: new Date(),
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to update customer",
//       success: false,
//       error: error.message,
//     });
//   }
// };

import {
  addCustomer,
  CustomerAlreadyExists,
  GetallCustomer,
  GetSpecificCustomerById,
  DeleteByAll,
  DeleteById,
  UpdateById,
} from "../models/addcustomer.js";

import { uploadToCloudinary } from "../utils/cloudinary.js";

// Add Customer
export const addcustomer = async (req, res) => {
  try {
    const { name, email, location, orders, TotalSpent, Tier } = req.body;

    if (
      !name ||
      !email ||
      !location ||
      orders === undefined ||
      orders === "" ||
      TotalSpent === undefined ||
      TotalSpent === "" ||
      !Tier
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const allowedTiers = ["VIP", "New", "Regular"];

    if (!allowedTiers.includes(Tier)) {
      return res.status(400).json({
        message: `Tier must be one of: ${allowedTiers.join(", ")}`,
        success: false,
      });
    }

    let parsedOrders = orders;

    if (typeof orders === "string") {
      try {
        parsedOrders = JSON.parse(orders);
      } catch {
        parsedOrders = orders;
      }
    }

    const ordersToStore =
      typeof parsedOrders === "object" && parsedOrders !== null
        ? JSON.stringify(parsedOrders)
        : parsedOrders;

    const exists = await CustomerAlreadyExists({ email });

    if (exists) {
      return res.status(409).json({
        message: "Customer already exists",
        success: false,
      });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "customers"
      );

      imageUrl = result.secure_url;
    }

    const customer = await addCustomer({
      image: imageUrl,
      name,
      email,
      location,
      orders: ordersToStore,
      TotalSpent,
      Tier,
    });

    return res.status(201).json({
      message: "Customer added successfully",
      success: true,
      customer,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("Add Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add customer",
    });
  }
};

// Get All Customers
export const Getallcustomer = async (req, res) => {
  try {
    const AllData = await GetallCustomer();

    if (!AllData || AllData.length === 0) {
      return res.status(404).json({
        message: "No customers found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Customers retrieved successfully",
      success: true,
      data: AllData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to retrieve customers",
      success: false,
      error: err.message,
    });
  }
};

// Get Specific Customer By ID
export const GetAllSpecificCustomerById = async (req, res) => {
  try {
    const data = await GetSpecificCustomerById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Customer retrieved successfully",
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to retrieve customer",
      success: false,
      error: err.message,
    });
  }
};

// Delete All Customers
export const GetDeleteByAll = async (req, res) => {
  try {
    const result = await DeleteByAll();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No customer data found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All customers deleted successfully",
      success: true,
      deletedCount: result.affectedRows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete customers",
      success: false,
      error: error.message,
    });
  }
};

// Delete Customer By ID
export const GetDeleteById = async (req, res) => {
  try {
    const result = await DeleteById(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Customer deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete customer",
      success: false,
      error: error.message,
    });
  }
};

// Update Customer By ID
export const GetUpdateById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      location,
      orders,
      TotalSpent,
      Tier,
    } = req.body;

    if (
      !name ||
      !email ||
      !location ||
      orders === undefined ||
      orders === "" ||
      TotalSpent === undefined ||
      TotalSpent === "" ||
      !Tier
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const allowedTiers = ["VIP", "New", "Regular"];

    if (!allowedTiers.includes(Tier)) {
      return res.status(400).json({
        message: `Tier must be one of: ${allowedTiers.join(", ")}`,
        success: false,
      });
    }

    const existingCustomer = await GetSpecificCustomerById(id);

    if (!existingCustomer) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }

    const emailExists = await CustomerAlreadyExists({ email });

    if (emailExists && existingCustomer.email !== email) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    let parsedOrders = orders;

    if (typeof orders === "string") {
      try {
        parsedOrders = JSON.parse(orders);
      } catch {
        parsedOrders = orders;
      }
    }

    const ordersToStore =
      typeof parsedOrders === "object" && parsedOrders !== null
        ? JSON.stringify(parsedOrders)
        : parsedOrders;

    let imageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "customers"
      );

      imageUrl = result.secure_url;
    }

    const result = await UpdateById(
      {
        image: imageUrl,
        name,
        email,
        location,
        orders: ordersToStore,
        TotalSpent,
        Tier,
      },
      id
    );

    return res.status(200).json({
      message: "Customer updated successfully",
      success: true,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Update Customer Error:", error);

    return res.status(500).json({
      message: "Failed to update customer",
      success: false,
      error: error.message,
    });
  }
};
