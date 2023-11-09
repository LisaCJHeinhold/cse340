const utilities = require("./index")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  new classification Data Validation Rules
 * ********************************* */
validate.newClassificationRules = () => {
    return [
      body("classification_name")
        .trim()
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("Classification name should contain NO spaces or special characters.")
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name.")
        .custom(async (classification_name) => {
            const nameExists = await invModel.checkExistingName(classification_name)
            if (nameExists){
              throw new Error("Classification name exists. Please use different name")
            }
          }),
    ]
}


validate.newClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "New Classification",
      nav,
      classification_name
    })
    return
  }
  next()
}

/*  **********************************
 *  new inventory Data Validation Rules
 * ********************************* */
validate.newInventoryRules = () => {
    return [
      body("inv_make")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle make."),
        
      body("inv_model")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle model."),

      body("inv_year")
        .trim()
        .isLength({ min: 4 })
        .isLength({ max: 4 })
        .isNumeric()
        .withMessage("Please provide the vehicle year."),

        body("inv_description")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle description."),

        body("inv_image")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle image.")
        .custom(invModel.isImage())
        .withMessage("Please provide a valid Image (ending in: .jpg, .jpeg, .png, or .webp"),

        body("inv_thumbnail")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle thumbnail.")
        .custom(invModel.isImage())
        .withMessage("Please provide a valid Image (ending in: .jpg, .jpeg, .png, or .webp"),

        body("inv_price")
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please provide the vehicle price."),

        body("inv_miles")
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please provide the vehicle miles."),

        body("inv_color")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the vehicle color."),

        body("classification_id")
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Please provide the vehicles classification id.")
    ]
}

validate.newInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let dropdown = await utilities.getDropDown()
      res.render("inventory/add-inventory", {
        errors,
        title: "New Inventory",
        nav,
        dropdown,
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_miles, 
        inv_color, 
        classification_id,
      })
      return
    }
    next()
}

module.exports = validate