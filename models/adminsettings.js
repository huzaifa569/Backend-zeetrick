import mysql from "mysql2/promise";


const pool = mysql.createConnection({
   host: "localhost",
    user: "root",
    password: "sayyousayme@123",
    database: "zeetrick",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})



export const accountProfileSchema = {
    profile_image: {
        type: String,
        required: false,
    },

    full_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    professional_bio: {
        type: String,
        required: false,
    },

    is_active: {
        type: Boolean,
        required: false,
        default: true,
    },

    created_at: {
        type: Date,
        required: false,
    },
};


// export const adminsettings = async () =>{
//     const connection = await pool.getConnection();
//     try{
//         const [result] = connection.execute(`
//             INSERT INTO account_profile 
//             `)
//     }
// }