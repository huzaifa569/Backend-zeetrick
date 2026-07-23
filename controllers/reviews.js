import { AddReviews, ReviewsAlreadyExists , GetAllReviews ,GetReviewsById ,DeleteAll,DeleteAllById ,UpdateReviews} from "../models/reviews.js";

export const PostAddReviews = async (req, res) => {
    const { CustomerName, Rating, ProductName, Comment, Date, Status } = req.body;

    try {
        if (!CustomerName || !Rating || !ProductName || !Comment || !Date || !Status) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if the review already exists
        const AlreadyData = await ReviewsAlreadyExists(CustomerName);

        if (AlreadyData.length > 0) {
            return res.status(400).json({
                message: "Review already exists.",
                success: false,
            });
        }

        // Save the review
        const AllData = await AddReviews({
            CustomerName,
            Rating,
            ProductName,
            Comment,
            Date,
            Status,
        });

        return res.status(201).json({
            message: "Review has been saved successfully.",
            success: true,
            data: AllData,
        });

    } catch (error) {
        console.error("PostAddReviews Error:", error);

        return res.status(500).json({
            message: "Something went wrong.",
            success: false,
        });
    }
};


export const GetAllReviwsFunc = async (req, res) => {
  try {
    const AllData = await GetAllReviews();

    if (AllData.length === 0) {
      return res.status(404).json({
        message: "No reviews found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Reviews fetched successfully.",
      success: true,
      data: AllData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const GetReviewsByIdFunc = async (req, res) => {
  const { id } = req.params;

  try {
    const allData = await GetReviewsById(id);

    if (allData.length === 0) {
      return res.status(404).json({
        message: "No review found for the given ID.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Review retrieved successfully.",
      success: true,
      data: allData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const GetDeleteAll = async (req, res) => {
  try {
    const alldata = await DeleteAll();

    if (alldata.length === 0) {
      return res.status(404).json({
        message: "No reviews found to delete.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All reviews have been deleted successfully.",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};




export const GetDeleteAllById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await DeleteAllById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No review found with the provided ID.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Review deleted successfully.",
      success: true,
    });

  } catch (error) {
    console.error("Delete Review Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const GetUpdateReviewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      CustomerName,
      Rating,
      ProductName,
      Comment,
      Date,
      Status,
    } = req.body;

    const AllData = await UpdateReviews(
      {
        CustomerName,
        Rating,
        ProductName,
        Comment,
        Date,
        Status,
      },
      id
    );

    if (AllData.affectedRows === 0) {
      return res.status(404).json({
        message: "No review found with the provided ID.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Review updated successfully.",
      success: true,
      data: AllData,
    });

  } catch (error) {
    console.error("Update Review Error:", error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};