export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'خروج با موفقیت انجام شد'
    });
  } catch (error) {
    console.error('❌ Error in logout:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در خروج' 
    });
  }
};
