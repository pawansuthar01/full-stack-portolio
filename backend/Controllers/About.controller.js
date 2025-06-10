import AppError from "../Utils/AppErrors.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import About_section from "../Modules/AboutModule.js";

//* uploadAboutSectionDetails//*
export const AboutSectionCreate = async (req, res, next) => {
  const { title, description, myJourney, funFact } = req.body;
  if (!title || !description || !myJourney || !funFact || !req.files) {
    return next(new AppError("please give All Data  ", 400));
  }
  let BannerAboutImage =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
  let AboutPageImage =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

  try {
    // *cloudinary setup //*
    if (req.files["BannerAboutImage"]) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.files["BannerAboutImage"][0].path,
          {
            folder: "BannerAboutImage",
          }
        );
        if (uploadedPhoto) {
          BannerAboutImage = uploadedPhoto.secure_url;
        }
        await fs.rm(req.files["BannerAboutImage"][0].path, { force: true });
      } catch (error) {
        await fs.rm(req.files["BannerAboutImage"][0].path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    if (req.files["AboutPageImage"]) {
      try {
        const uploadedPhoto = await cloudinary.v2.uploader.upload(
          req.files["AboutPageImage"][0].path,
          {
            folder: "AboutPageImage",
          }
        );
        if (uploadedPhoto) {
          AboutPageImage = uploadedPhoto.secure_url;
        }
        await fs.rm(req.files["AboutPageImage"][0].path, { force: true });
      } catch (error) {
        await fs.rm(req.files["AboutPageImage"][0].path, { force: true });
        return next(new AppError(error.message, 400));
      }
    }
    let MyJourney = [];
    let FunFact = [];

    if (req.body.myJourney) {
      try {
        MyJourney = JSON.parse(req.body.myJourney);
      } catch (err) {
        return next(new AppError("Invalid JSON in myJourney", 400));
      }
    }

    if (req.body.funFact) {
      try {
        FunFact = JSON.parse(req.body.funFact);
      } catch (err) {
        return next(new AppError("Invalid JSON in funFact", 400));
      }
    }
    const CreateAbout = new About_section({
      title,
      myJourney: MyJourney,
      funFact: FunFact,
      description,
      BannerAboutImage,
      AboutPageImage,
    });
    if (!CreateAbout) {
      return next(new AppError("SomeThing Wont wrong...", 400));
    }
    await CreateAbout.save();
    res.status(200).json({
      success: true,
      message: "Successfully upload data....",
      data: CreateAbout,
    });
  } catch (error) {
    if (req.file) {
      await fs.rm(req.file.path, { force: true });
    }
    return next(new AppError(error.message, 400));
  }
};
export const AboutSectionUpdate = async (req, res, next) => {
  const { title, description } = req.body;

  let BannerAboutImage =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
  let AboutPageImage =
    "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

  if (req.files["BannerAboutImage"]) {
    try {
      const uploadedPhoto = await cloudinary.v2.uploader.upload(
        req.files["BannerAboutImage"][0].path,
        {
          folder: "BannerAboutImage",
        }
      );
      if (uploadedPhoto) {
        BannerAboutImage = uploadedPhoto.secure_url;
      }
      await fs.rm(req.files["BannerAboutImage"][0].path, { force: true });
    } catch (error) {
      await fs.rm(req.files["BannerAboutImage"][0].path, { force: true });
      return next(new AppError(error.message, 400));
    }
  }
  if (req.files["AboutPageImage"]) {
    try {
      const uploadedPhoto = await cloudinary.v2.uploader.upload(
        req.files["AboutPageImage"][0].path,
        {
          folder: "AboutPageImage",
        }
      );
      if (uploadedPhoto) {
        AboutPageImage = uploadedPhoto.secure_url;
      }
      await fs.rm(req.files["AboutPageImage"][0].path, { force: true });
    } catch (error) {
      await fs.rm(req.files["AboutPageImage"][0].path, { force: true });
      return next(new AppError(error.message, 400));
    }
  }
  try {
    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(req.files["BannerAboutImage"] && { BannerAboutImage }),
      ...(req.files["AboutPageImage"] && { AboutPageImage }),
    };

    const aboutData = await About_section.findOneAndUpdate(
      { Key_id: "INFO_ABOUT" },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!aboutData) {
      return next(new AppError("Something went wrong...", 400));
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated About data",
      aboutData,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const GetAbout = async (req, res, next) => {
  try {
    const aboutData = await About_section.findOne({ Key_id: "INFO_ABOUT" });
    res.status(200).json({
      success: true,

      aboutData,

      message: "successfully data get",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
export const addJourneyItem = async (req, res, next) => {
  try {
    const {
      year: date,
      title: educationTitle,
      description: educationDescription,
    } = req.body;

    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });
    about.myJourney.push({ date, educationTitle, educationDescription });
    await about.save();

    res.status(200).json({ success: true, myJourney: about.myJourney });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

export const updateJourneyItem = async (req, res, next) => {
  try {
    const { index } = req.params;
    const { date, educationTitle, educationDescription } = req.body;

    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });
    about.myJourney[index] = { date, educationTitle, educationDescription };
    await about.save();

    res.status(200).json({ success: true, data: about.myJourney });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

export const deleteJourneyItem = async (req, res, next) => {
  try {
    const { index } = req.params;
    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });

    about.myJourney.splice(index, 1);
    await about.save();

    res.status(200).json({ success: true, data: about.myJourney });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

// === Fun Fact ===
export const addFunFact = async (req, res, next) => {
  try {
    const {
      Icon: icon,
      title: factCount,
      description: factDescription,
    } = req.body;
    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });
    about.funFact.push({ icon, factCount, factDescription });
    await about.save();

    res.status(200).json({ success: true, data: about.funFact });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

export const updateFunFact = async (req, res, next) => {
  try {
    const { index } = req.params;
    const { cion, factCount, factDescription } = req.body;
    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });

    about.funFact[index] = { cion, factCount, factDescription };
    await about.save();

    res.status(200).json({ success: true, data: about.funFact });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

export const deleteFunFact = async (req, res, next) => {
  try {
    const { index } = req.params;
    const about = await About_section.findOne({ Key_id: "INFO_ABOUT" });

    about.funFact.splice(index, 1);
    await about.save();

    res.status(200).json({ success: true, data: about.funFact });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};
