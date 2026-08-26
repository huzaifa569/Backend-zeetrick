import { addCustomer, CustomerAlreadyExists, GetallCustomer,GetSpecificCustomerById ,DeleteByAll ,DeleteById,UpdateById} from "../models/addcustomer.js";

export const addcustomer = async (req, res) => {
  try {
    const { name, email, location, orders, optionList } = req.body;

    if (!name || !email || !location || !orders || !optionList) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });;
    }

    const exists = await CustomerAlreadyExists({
      name,
      email,
      location,
      orders,
      optionList,
    });

    if (exists) {
      return res.status(409).json({
        message: "Customer already exists",
        success: false,
      });
    }

    const customer = await addCustomer({
      name,
      email,
      location,
      orders,
      optionList,
    });

    return res.status(201).json({
      message: "Customer added successfully",
      success: true,
      customer,
      created_at: new Date(),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Customer not added",
      success: false,
    });
  }
};

export const Getallcustomer = async (req, res) => {
  try {
    const AllData = await GetallCustomer();

    if (AllData.length === 0) {
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


export const GetAllSpecificCustomerById = async (req, res) => {
  try {
    const GetAllDataByID = await GetSpecificCustomerById(req.params.id);

    if (GetAllDataByID.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Customer retrieved successfully",
      success: true,
      data: GetAllDataByID,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to retrieve customer",
      success: false,
      error: err.message,
    });
  }
};


export const GetDeleteByAll = async (req, res) => {
  try {
    const AllDataDelete = await DeleteByAll();

    if (AllDataDelete.affectedRows === 0) {
      return res.status(404).json({
        message: "No customer data found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All customers deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete customers",
      success: false,
      error: error.message,
    });
  }
};

export const GetDeleteById = async (req, res) => {
  try {
    const specificData = await DeleteById(req.params.id);

    if (specificData.affectedRows === 0) {
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


export const GetUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, location, orders, optionList } = req.body;

    if (!name || !email || !location || !orders || !optionList) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const customer = await UpdateById({
      id,
      name,
      email,
      location,
      orders,
      optionList,
    });

    return res.status(200).json({
      message: "Customer updated successfully",
      success: true,
      customer,
      updated_at: new Date(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update customer",
      success: false,
      error: error.message,
    });
  }
};