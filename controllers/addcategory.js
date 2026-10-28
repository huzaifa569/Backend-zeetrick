import { createCategoryModel ,UpdateCategoryModel ,GetallCategoryModel ,GetByIdCategoryModel,DeleteallCategoryModel,DeleteaByIdCategoryModel} from "../models/addcategory.js";

export const addcategory = async (req, res) => {
    const { category } = req.body;

    try {
        if (!category || !category.trim()) {
            return res.status(400).json({
                message: "Category field is required",
                success: false
            });
        }

        const postdata = await createCategoryModel({
            category: category.trim()
        });

        if (postdata.exists) {
            return res.status(409).json({
                message: "Category already exists",
                success: false
            });
        }

        return res.status(201).json({
            message: "Category added successfully",
            success: true,
            data: postdata
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message || "Failed to add category"
        });
    }
};


export const Updatecategory = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        const newdata = await UpdateCategoryModel(id, { category });

        if (newdata.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const Getallcategories = async (req, res) => {
    try {
        const Category = await GetallCategoryModel();

        if (!Category || Category.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: Category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        });
    }
};

export const GetByIdcategory = async (req, res) => {
    try {
        const Categorie = await GetByIdCategoryModel(req.params.id);

        if (!Categorie) {
            return res.status(404).json({
                success: false,
                message: "Categories not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: Categorie
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const DeleteallCategory = async (req, res) => {
    try {
        const result = await DeleteallCategoryModel();

        return res.status(200).json({
            success: true,
            affectedRows: result.affectedRows,
            message: "All categories deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const DeleteByIdCategory = async (req, res) => {
    try {
        const result = await DeleteaByIdCategoryModel(req.params.id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found or already deleted",
                affectedRows: result?.affectedRows ?? 0
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            affectedRows: result.affectedRows
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
