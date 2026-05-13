import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { register } from '../services/authService.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
export const adminRouter = exp.Router()

//Register Admin(public)
adminRouter.post('/admins', async (req, res) => {
    let userObj = req.body;
    const newUserObj = await register({ ...userObj, role: "ADMIN" });
    res.status(201).json({ message: 'admin created successfully', payload: newUserObj });
});

// All routes below require admin auth
adminRouter.use(verifyToken, checkAdmin);

// ─── Articles ───────────────────────────────────────

// GET all articles (all authors, active + inactive)
adminRouter.get('/articles', async (req, res) => {
    try {
        let articles = await ArticleModel.find()
            .populate('author', 'firstName lastName email profileImageURL')
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'articles fetched successfully', payload: articles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET articles by a specific author (admin override — includes inactive)
adminRouter.get('/articles/author/:authorId', async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let author = await UserModel.findById(authorId);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        let articles = await ArticleModel.find({ author: authorId })
            .populate('author', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'articles fetched successfully', payload: articles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE (soft) any article — admin override, no ownership check
adminRouter.patch('/articles/:articleId/deactivate', async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let articleObj = await ArticleModel.findById(articleId);
        if (!articleObj) return res.status(404).json({ message: 'Article not found' });

        let result = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $set: { isArticleActive: false } },
            { new: true }
        );
        res.status(200).json({ message: 'Article deactivated successfully', payload: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// RESTORE a deactivated article
adminRouter.patch('/articles/:articleId/restore', async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let articleObj = await ArticleModel.findById(articleId);
        if (!articleObj) return res.status(404).json({ message: 'Article not found' });

        let result = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $set: { isArticleActive: true } },
            { new: true }
        );
        res.status(200).json({ message: 'Article restored successfully', payload: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── Users ───────────────────────────────────────────

// GET all users (all roles)
adminRouter.get('/users', async (req, res) => {
    try {
        let users = await UserModel.find({}, '-password').sort({ createdAt: -1 });
        res.status(200).json({ message: 'users fetched successfully', payload: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// BLOCK user
adminRouter.put('/block-user', async (req, res) => {
    try {
        let { userId } = req.body;
        let user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isActive = false;
        await user.save();
        res.status(200).json({ message: 'User blocked successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UNBLOCK user
adminRouter.put('/unblock-user', async (req, res) => {
    try {
        let { userId } = req.body;
        let user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isActive = true;
        await user.save();
        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
