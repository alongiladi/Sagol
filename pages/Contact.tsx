import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Send, MessageSquare, CheckCircle, Mail } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

interface ContactFormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  disabilityType: string;
  areaOfNeed: string;
  contactMethod: string;
  needDetails: string;
  citizenType: string;
  consent: boolean;
}

const cities = [
  'אבו גוש', 'אבו סנאן', 'אבן יהודה', 'אום אל-פחם', 'אופקים', 'אור יהודה', 'אור עקיבא', 'אורנית', 'אזור', 'אילת',
  'אכסאל', 'אל קסום', 'אל-בטוף', 'אלונה', 'אליכין', 'אלעד', 'אלפי מנשה', 'אלקנה', 'אעבלין', 'אפרת',
  'אריאל', 'אשדוד', 'אשכול', 'אשקלון', 'באקה אל-גרביה', 'באר טוביה', 'באר יעקב', 'באר שבע', 'בוסתן אל-מרג\'',
  'בועיינה-נוג\'ידאת', 'בוקעאתא', 'ביר אל-מכסור', 'בית אל', 'בית אריה-עופרים', 'בית ג\'ן', 'בית דגן', 'בית שאן',
  'בית שמש', 'ביתר עילית', 'בני ברק', 'בני עי"ש', 'בני שמעון', 'בנימינה-גבעת עדה', 'בסמ"ה', 'בסמת טבעון',
  'בענה', 'ברנר', 'בת ים', 'ג\'דיידה-מכר', 'ג\'ולס', 'ג\'לג\'וליה', 'ג\'סר א-זרקא', 'ג\'ש (גוש חלב)', 'ג\'ת',
  'גבעת זאב', 'גבעת שמואל', 'גבעתיים', 'גדרה', 'גדרות', 'גולן', 'גוש עציון', 'גזר', 'גן יבנה', 'גן רווה',
  'גני תקווה', 'דאלית אל-כרמל', 'דבורייה', 'דייר אל-אסד', 'דייר חנא', 'דימונה', 'דרום השרון', 'הגלבוע',
  'הגליל העליון', 'הגליל התחתון', 'הוד השרון', 'הערבה התיכונה', 'הר אדר', 'הר חברון', 'הרצליה', 'זבולון',
  'זכרון יעקב', 'זמר', 'זרזיר', 'חבל אילות', 'חבל יבנה', 'חבל מודיעין', 'חדרה', 'חולון', 'חוף אשקלון',
  'חוף הכרמל', 'חוף השרון', 'חורה', 'חורפיש', 'חיפה', 'חצור הגלילית', 'חריש', 'טבריה', 'טובא-זנגרייה', 'טורעאן',
  'טייבה', 'טירה', 'טירת כרמל', 'טמרה', 'יאנוח-ג\'ת', 'יבנאל', 'יבנה', 'יהוד-מונוסון', 'יואב', 'יסוד המעלה',
  'יפיע', 'יקנעם עילית', 'ירוחם', 'ירושלים', 'ירכא', 'כאבול', 'כאוכב אבו אל-היג\'א', 'כוכב יאיר', 'כסיפה',
  'כסרא-סמיע', 'כעביה-טבאש-חג\'אג\'רה', 'כפר ברא', 'כפר ורדים', 'כפר יאסיף', 'כפר יונה', 'כפר כמא', 'כפר כנא',
  'כפר מנדא', 'כפר סבא', 'כפר קאסם', 'כפר קרע', 'כפר שמריהו', 'כפר תבור', 'כרמיאל', 'לב השרון', 'להבים',
  'לוד', 'לכיש', 'לקיה', 'מבואות החרמון', 'מבשרת ציון', 'מג\'ד אל-כרום', 'מג\'דל שמס', 'מגאר', 'מגדל',
  'מגדל העמק', 'מגידו', 'מגילות ים המלח', 'מודיעין עילית', 'מודיעין-מכבים-רעות', 'מזכרת בתיה', 'מזרעה',
  'מטה אשר', 'מטה בנימין', 'מטה יהודה', 'מטולה', 'מיתר', 'מנשה', 'מסעדה', 'מעיליא', 'מעלה אדומים',
  'מעלה אפרים', 'מעלה יוסף', 'מעלה עירון', 'מעלות-תרשיחא', 'מצפה רמון', 'מרום הגליל', 'מרחבים', 'משגב',
  'משהד', 'נהרייה', 'נווה מדבר', 'נוף הגליל', 'נחל שורק', 'נחף', 'נס ציונה', 'נצרת', 'נשר', 'נתיבות',
  'נתניה', 'סאג\'ור', 'סביון', 'סח\'נין', 'ע\'ג\'ר', 'עומר', 'עיילבון', 'עילוט', 'עין מאהל', 'עין קנייא',
  'עכו', 'עמנואל', 'עמק הירדן', 'עמק המעיינות', 'עמק חפר', 'עמק יזרעאל', 'עספיא', 'עפולה', 'עראבה',
  'ערבות הירדן', 'ערד', 'ערערה', 'ערערה-בנגב', 'פוריידיס', 'פסוטה', 'פקיעין (בוקייעה)', 'פרדס חנה-כרכור',
  'פרדסייה', 'פתח תקווה', 'צפת', 'קדומים', 'קדימה-צורן', 'קלנסווה', 'קצרין', 'קריית אונו', 'קריית ארבע',
  'קריית אתא', 'קריית ביאליק', 'קריית גת', 'קריית טבעון', 'קריית ים', 'קריית יערים', 'קריית מוצקין',
  'קריית מלאכי', 'קריית עקרון', 'קריית שמונה', 'קרני שומרון', 'ראמה', 'ראש העין', 'ראש פינה', 'ראשון לציון',
  'רהט', 'רחובות', 'ריינה', 'רכסים', 'רמלה', 'רמת גן', 'רמת השרון', 'רמת ישי', 'רמת נגב', 'רעננה',
  'שבלי - אום אל-גנם', 'שגב-שלום', 'שדות דן', 'שדות נגב', 'שדרות', 'שוהם', 'שומרון', 'שלומי', 'שעב',
  'שער הנגב', 'שער שומרון', 'שפיר', 'שפרעם', 'תל אביב -יפו', 'תל מונד', 'תל שבע', 'תמר', 'אחר'
];

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>();
  const { content, language } = useLanguage();

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      console.log('Form data:', data);
      await submitToGoogleSheets('Contact', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      alert('שגיאה בשליחת הטופס. אנא נסו שוב.');
      console.error('Form submission error:', error);
    }
  };

  // Shared Input Styles to match existing theme
  const inputClasses = (hasError: boolean) => `
    w-full bg-purple-950/50 border rounded-xl p-4 text-white transition-all 
    placeholder-purple-700/50 focus:outline-none focus:ring-1 
    ${hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-purple-700 focus:border-cyan-400 focus:ring-cyan-400'}
  `;

  const labelClasses = "block text-purple-200 text-sm font-medium mb-2";

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 mb-16 pt-8">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-6">
              {content.contactPage.title}
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-4 font-heebo">
              {content.contactPage.subtitle}
            </p>
            <p className="text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
              {content.contact.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative px-4 mb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-4 md:p-8 lg:p-12 bg-gradient-to-br from-purple-900/50 to-purple-950/80 border-purple-500/30 backdrop-blur-md shadow-2xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{content.forms.success.contactTitle}</h3>
                  <p className="text-xl text-purple-200">{content.forms.success.contactText}</p>
                  <Button
                    variant="secondary"
                    className="mt-8"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {content.forms.buttons.sendAnother}
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <MessageSquare className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white text-center">
                      {content.contactPage.formTitle}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className={labelClasses}>{content.forms.labels.firstName} <span className="text-purple-400">*</span></label>
                        <input
                          id="firstName"
                          {...register("firstName", { required: content.forms.validation.required })}
                          className={inputClasses(!!errors.firstName)}
                          placeholder={content.forms.placeholders.answer}
                        />
                        {errors.firstName && <span className="text-red-400 text-xs mt-1 block">{errors.firstName.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClasses}>{content.forms.labels.lastName} <span className="text-purple-400">*</span></label>
                        <input
                          id="lastName"
                          {...register("lastName", { required: content.forms.validation.required })}
                          className={inputClasses(!!errors.lastName)}
                          placeholder={content.forms.placeholders.answer}
                        />
                        {errors.lastName && <span className="text-red-400 text-xs mt-1 block">{errors.lastName.message}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className={labelClasses}>{content.forms.labels.phone} <span className="text-purple-400">*</span></label>
                        <input
                          id="phone"
                          type="tel"
                          dir="ltr"
                          {...register("phone", {
                            required: content.forms.validation.required,
                            pattern: {
                              value: /^[0-9-+() ]{9,}$/,
                              message: content.forms.validation.phoneInvalid
                            }
                          })}
                          className={`${inputClasses(!!errors.phone)} ${language === 'he' ? 'text-right' : 'text-left'}`}
                          placeholder={content.forms.placeholders.phone}
                        />
                        {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClasses}>{content.forms.labels.email} <span className="text-purple-400">*</span></label>
                        <input
                          id="email"
                          type="email"
                          dir="ltr"
                          {...register("email", {
                            required: content.forms.validation.required,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: content.forms.validation.emailInvalid,
                            },
                          })}
                          className={`${inputClasses(!!errors.email)} ${language === 'he' ? 'text-right' : 'text-left'}`}
                          placeholder={content.forms.placeholders.email}
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className={labelClasses}>{content.forms.labels.city} <span className="text-purple-400">*</span></label>
                      <select
                        id="city"
                        {...register("city", { required: content.forms.validation.required })}
                        className={`${inputClasses(!!errors.city)} bg-purple-950`}
                      >
                        <option value="">{content.forms.options.choose}</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <span className="text-red-400 text-xs mt-1 block">{errors.city.message}</span>}
                    </div>

                    <div>
                      <label htmlFor="disabilityType" className={labelClasses}>
                        {content.forms.labels.disabilityType} <span className="text-purple-400">*</span>
                      </label>
                      <select
                        id="disabilityType"
                        {...register("disabilityType", { required: content.forms.validation.required })}
                        className={`${inputClasses(!!errors.disabilityType)} bg-purple-950`}
                      >
                        <option value="">{content.forms.options.choose}</option>
                        {content.forms.options.disabilityTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.disabilityType && <span className="text-red-400 text-xs mt-1 block">{errors.disabilityType.message}</span>}
                    </div>

                    <div>
                      <label htmlFor="areaOfNeed" className={labelClasses}>{content.forms.labels.areaOfNeed} <span className="text-purple-400">*</span></label>
                      <select
                        id="areaOfNeed"
                        {...register("areaOfNeed", { required: content.forms.validation.required })}
                        className={`${inputClasses(!!errors.areaOfNeed)} bg-purple-950`}
                      >
                        <option value="">{content.forms.options.choose}</option>
                        {content.forms.options.areasOfNeed.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      {errors.areaOfNeed && <span className="text-red-400 text-xs mt-1 block">{errors.areaOfNeed.message}</span>}
                    </div>

                    <div>
                      <label className="block text-white text-lg font-medium mb-3">
                        {content.forms.labels.contactMethod} <span className="text-purple-400">*</span>
                      </label>
                      <div className="space-y-3 bg-purple-950/30 p-4 rounded-xl border border-purple-800">
                        {content.forms.options.contactMethods.map((method) => (
                          <label
                            key={method}
                            className="flex items-center gap-3 text-purple-100 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="radio"
                              value={method}
                              {...register('contactMethod', { required: content.forms.validation.required })}
                              className="w-5 h-5 accent-cyan-400 bg-gray-800 border-purple-500/30 focus:ring-cyan-400 focus:ring-2"
                            />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
                      {errors.contactMethod && (
                        <p className="text-red-400 text-xs mt-2">{errors.contactMethod.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="needDetails" className={labelClasses}>{content.forms.labels.needDetails} <span className="text-purple-400">*</span></label>
                      <textarea
                        id="needDetails"
                        {...register("needDetails", { required: content.forms.validation.required })}
                        className={`${inputClasses(!!errors.needDetails)} h-32 resize-none`}
                        placeholder={content.forms.placeholders.answer}
                      />
                      {errors.needDetails && <span className="text-red-400 text-xs mt-1 block">{errors.needDetails.message}</span>}
                    </div>

                    <div>
                      <label className="block text-white text-lg font-medium mb-3">
                        {content.forms.labels.citizenType}
                      </label>
                      <div className="space-y-3 bg-purple-950/30 p-4 rounded-xl border border-purple-800">
                        {content.forms.options.citizenTypes.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-3 text-purple-100 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="radio"
                              value={type}
                              {...register('citizenType')}
                              className="w-5 h-5 accent-cyan-400 bg-gray-800 border-purple-500/30 focus:ring-cyan-400 focus:ring-2"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-lg font-medium mb-3">
                        {content.forms.labels.consent} <span className="text-purple-400">*</span>
                      </label>
                      <div className="flex items-center gap-3 bg-purple-950/30 p-4 rounded-xl border border-purple-800">
                        <input
                          type="checkbox"
                          id="consent"
                          {...register('consent', { required: content.forms.validation.consentRequired })}
                          className="w-5 h-5 accent-cyan-400 bg-gray-800 border-purple-500/30 rounded focus:ring-cyan-400 focus:ring-2"
                        />
                        <label htmlFor="consent" className="text-purple-100 cursor-pointer select-none">
                          {content.forms.labels.consentLabel}
                        </label>
                      </div>
                      {errors.consent && (
                        <p className="text-red-400 text-xs mt-2">{errors.consent.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full py-4 text-lg shadow-lg shadow-purple-900/20 mt-4"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {content.forms.buttons.sending}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {content.forms.buttons.submit} <Send size={18} className={language === 'he' ? "rotate-180" : ""} />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="relative px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card variant="hover" className="h-full p-8 text-center bg-purple-900/20 border-purple-500/20">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center text-cyan-400">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{content.contactPage.infoTitle}</h3>
                <p className="text-purple-200 break-words">
                  {content.contact.details.email}
                </p>
              </Card>
            </motion.div>



            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card variant="hover" className="h-full p-8 text-center bg-purple-900/20 border-purple-500/20">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center text-cyan-400">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{content.contactPage.hoursTitle}</h3>
                <p className="text-purple-200 text-sm mb-1">
                  {content.contactPage.hoursDays}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
