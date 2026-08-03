import pool from './db.js';

export const reviewsSchema = {
    CustomerName: {
        type: String,
        required: true,
    },

    Rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },

    ProductName: {
        type: String,
        required: true,
    },

    Comment: {
        type: String,
        required: true,
    },

    Date: {
        type: Date,
        required: true,
    },

    Status: {
        type: String,
        enum: ["pending", "approved", "flagged"],
        required: true,
    },
};

export const AddReviews = async (ReviewsData) => {
    const connection = await pool.getConnection();

    try {
        const [result] = await connection.execute(
            `INSERT INTO reviews (CustomerName, Rating, ProductName, Comment, Date, Status)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                ReviewsData.CustomerName,
                ReviewsData.Rating,
                ReviewsData.ProductName,
                ReviewsData.Comment,
                ReviewsData.Date,
                ReviewsData.Status,
            ]
        );

        return result;
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    } finally {
        connection.release();
    }
};

export const ReviewsAlreadyExists = async (CustomerName) => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute(
            `SELECT * FROM reviews WHERE CustomerName = ?`,
            [CustomerName]
        );

        return rows;
    } catch (error) {
        console.error("Error checking review:", error);
        throw error;
    } finally {
        connection.release();
    }
};


export const GetAllReviews = async () => {
    const connection = await pool.getConnection()
    try{
        const [result] = await connection.execute(
            "SELECT * FROM  reviews"
        )
        return result
    }
    catch(error){
        throw error
    }
    finally{
        connection.release();
    }
}

export const GetReviewsById = async (id) => {
    const connection = await pool.getConnection();
    try{
        const [result] = await connection.execute(
                "SELECT * FROM reviews WHERE id = ?",
            [id]
        )
        return result
    }catch(error){
        throw error
    }
    finally{
        connection.release()
    }
}

export const DeleteAll = async () => {
    const connection = await pool.getConnection();
    try{
        const [result] = await connection.execute(
            `DELETE  FROM reviews`
        )
                await connection.execute(`ALTER TABLE reviews AUTO_INCREMENT = 1`);

        return result
    }
    catch(error){
        throw error
    }
    finally{
        connection.release();
    }
}

export const DeleteAllById = async (id) => {
const connection = await pool.getConnection();
try{
    const [result] = await connection.execute(
        `DELETE FROM reviews WHERE id = ?`,
        [id]
    )
    return result
}catch(error){
    throw error
}finally{
    connection.release();
}
}

export const UpdateReviews = async (ReviewsData, id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE reviews
       SET CustomerName = ?,
           Rating = ?,
           ProductName = ?,
           Comment = ?,
           Date = ?,
           Status = ?
       WHERE id = ?`,
      [
        ReviewsData.CustomerName,
        ReviewsData.Rating,
        ReviewsData.ProductName,
        ReviewsData.Comment,
        ReviewsData.Date,
        ReviewsData.Status,
        id,
      ]
    );

    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};