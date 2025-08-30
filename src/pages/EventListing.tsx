import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Phone, MessageCircle, Mail, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const EventListing = () => {
  const navigate = useNavigate();

  const handleWhatsAppSubmission = () => {
    const message = `Hi Sokoni Arena! I want to list my EVENT/PARTY on your platform. Here are the details:

🎉 Event/Party Name: [Your event name]
📅 Date: [Event date]
⏰ Time: [Start time - End time]
📍 Venue: [Venue name and location]
💰 Ticket Price: KSh [Your price] (or Free)
👥 Expected Attendees: [Number]
📝 Description: [Detailed description]
🎯 Category: [Conference/Party/Workshop/Festival/etc.]

Organizer Information:
👤 Name: [Your full name]
📞 Phone: [Your phone number]
📱 WhatsApp: [Your WhatsApp number]
📧 Email: [Your email address]

Additional Details:
📸 Images: [I will send event images]
🎫 Registration: [How people can register/buy tickets]
🌟 Special Features: [Any special attractions/speakers]

Please let me know the next steps for listing my event!`;
    
    window.open(`https://wa.me/254708083263?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailSubmission = () => {
    const subject = 'Event/Party Listing Submission - Sokoni Arena';
    const body = `Dear Sokoni Arena Team,

I would like to list my EVENT/PARTY on your platform. Please find the details below:

Event Information:
- Event/Party Name: [Your event name]
- Date: [Event date]
- Time: [Start time - End time]
- Venue: [Venue name and complete address]
- Ticket Price: KSh [Your price] (or Free if applicable)
- Expected Attendees: [Number]
- Category: [Conference/Party/Workshop/Festival/Concert/etc.]
- Description: [Detailed description of the event]

Organizer Information:
- Name: [Your full name]
- Organization: [Your organization/company name]
- Phone: [Your phone number]
- WhatsApp: [Your WhatsApp number]
- Email: [Your email address]

Additional Information:
- Images: [Please attach high-quality event images/posters]
- Registration Process: [How people can register or buy tickets]
- Special Features: [Speakers, entertainment, activities, etc.]
- Target Audience: [Who should attend this event]

Please let me know the next steps for listing my event and any additional requirements.

Best regards,
[Your name]`;

    window.open(`mailto:sokoniarena@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handleGoogleFormSubmission = () => {
    window.open('https://forms.gle/em9PZJ5f9AfnoGWV7', '_blank');
  };

  const requirements = [
    {
      icon: Calendar,
      title: 'Event Details',
      description: 'Date, time, venue, and ticket pricing'
    },
    {
      icon: FileText,
      title: 'Event Description',
      description: 'Detailed description and target audience'
    },
    {
      icon: Star,
      title: 'High-Quality Images',
      description: 'Event posters, venue photos, or promotional images'
    },
    {
      icon: MessageCircle,
      title: 'Contact Information',
      description: 'Valid organizer contact details'
    },
    {
      icon: Users,
      title: 'Registration Process',
      description: 'How attendees can register or buy tickets'
    },
    {
      icon: Clock,
      title: 'Quick Approval',
      description: 'Most events go live within 24 hours'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Reach More People',
      description: 'Connect with thousands of potential attendees across Kenya'
    },
    {
      icon: Star,
      title: 'Premium Visibility',
      description: 'Featured placement for maximum exposure'
    },
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Easy updates and attendee communication'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold gradient-text">List Your Event</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Benefits Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Promote Your Event on Sokoni Arena
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Whether it's a conference, party, workshop, or festival - reach thousands of potential attendees across Kenya through our beautiful platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Submission Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="hot-deal-glow">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-4">
                  Submit Your Event for Listing
                </h3>
                <p className="text-lg text-muted-foreground">
                  Choose your preferred method to submit your event details
                </p>
              </div>

              {/* Submission Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="relative">
                    <Button
                      onClick={handleWhatsAppSubmission}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-6 mb-4 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <MessageCircle className="w-6 h-6 mr-2" />
                      Submit via WhatsApp
                    </Button>
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-yellow-900">
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Quick and easy submission through WhatsApp
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="relative">
                    <Button
                      onClick={handleEmailSubmission}
                      className="w-full btn-hero py-6 mb-4 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <Mail className="w-6 h-6 mr-2" />
                      Submit via Email
                    </Button>
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-yellow-900">
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional email submission with templates
                  </p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <Button
                    onClick={handleGoogleFormSubmission}
                    className="w-full btn-hero-outline py-6 mb-4"
                  >
                    <FileText className="w-6 h-6 mr-2" />
                    Submit via Google Form
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Structured form with file upload support
                  </p>
                </motion.div>
              </div>

              {/* Requirements */}
              <div className="border-t pt-8">
                <h4 className="text-xl font-bold text-center mb-6">What You Need to Provide:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {requirements.map((req, index) => (
                    <motion.div
                      key={req.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <req.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="font-semibold text-foreground mb-2">{req.title}</h5>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Premium Events Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-hot-deal p-6 rounded-xl mt-8 text-center"
              >
                <h4 className="text-xl font-bold text-primary mb-4">
                  Want Premium Featured Placement?
                </h4>
                <p className="text-muted-foreground mb-4">
                  Get maximum visibility with our Featured Events section. Pay via M-Pesa for premium placement!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="bg-white/50 px-4 py-2 rounded-lg">
                    <span className="font-semibold">7 Days: KSh 800</span>
                  </div>
                  <div className="bg-white/50 px-4 py-2 rounded-lg">
                    <span className="font-semibold">14 Days: KSh 1,200</span>
                  </div>
                  <div className="bg-white/50 px-4 py-2 rounded-lg">
                    <span className="font-semibold">30 Days: KSh 1,800</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventListing;