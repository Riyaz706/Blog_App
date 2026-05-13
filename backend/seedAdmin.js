import { connect } from 'mongoose'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'
import { UserModel } from './models/UserModel.js'

config()

const seedAdmin = async () => {
    try {
        await connect(process.env.DB_URL)
        console.log('✅ Connected to MongoDB Atlas')

        const existing = await UserModel.findOne({ email: 'admin@gmail.com' })
        if (existing) {
            console.log('⚠️  Admin already exists:', existing.email)
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash('Admin@123', 10)

        const admin = new UserModel({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
            isActive: true
        })

        await admin.save()
        console.log('🎉 Admin seeded successfully!')
        console.log('   Email:    admin@gmail.com')
        console.log('   Password: Admin@123')
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed failed:', err.message)
        process.exit(1)
    }
}

seedAdmin()
