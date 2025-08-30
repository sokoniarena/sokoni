import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, Mail, Star, MapPin, Calendar, Clock, Users, Shield, Heart, Share2, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allEvents, type Event } from '@/data/eventData';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const event = allEvents.find(e => e.id === eventId);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string, eventTitle: string) => {
    const message = `Hi! I'm interested in attending: ${eventTitle}. Could you provide more details about tickets and registration?`;
    window.open(`https://wa.me/254${phone.slice(1)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = (email: string, eventTitle: string) => {
    const subject = `Event Registration Inquiry: ${eventTitle}`;
    const body = `Hi,\n\nI'm interested in attending: ${eventTitle}\n\nCould you please provide more information about:\n- Ticket availability\n- Registration process\n- Event schedule\n- Payment methods\n- Any special requirements\n\nThanks!\n\nBest regards`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event!.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event!.images.length) % event!.images.length);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const attendancePercentage = Math.round((event.attendees / event.capacity) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold gradient-text line-clamp-1">{event.title}</h1>
                <p className="text-sm text-muted-foreground">{event.category} • {event.venue}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-card">
              <img
                src={event.images[currentImageIndex]}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {event.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Featured Event
                  </Badge>
                </div>
              )}
              {event.originalPrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                  Save {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}%
                </div>
              )}
              
              {/* Navigation Arrows */}
              {event.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {event.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {event.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${event.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  KSh {event.price.toLocaleString()}
                </span>
                {event.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    KSh {event.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(event.date).toLocaleDateString()}
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {event.time}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {event.venue}
                </Badge>
                <Badge variant="secondary">
                  <Users className="w-3 h-3 mr-1" />
                  {event.attendees}/{event.capacity} attending
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Event Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
                </div>
                
                {event.requirements && (
                  <div>
                    <h4 className="font-semibold mb-2">What to Bring:</h4>
                    <ul className="space-y-1">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="agenda" className="space-y-4">
                {event.agenda ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Event Schedule</h3>
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/20 rounded-lg">
                        <Badge variant="outline" className="mt-1">{item.time}</Badge>
                        <span className="text-sm">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Detailed agenda will be shared closer to the event date.</p>
                )}
              </TabsContent>
              
              <TabsContent value="speakers" className="space-y-4">
                {event.speakers ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Featured Speakers</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-secondary/20 rounded-lg">
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{speaker.name}</h4>
                            <p className="text-sm text-muted-foreground">{speaker.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Speaker lineup will be announced soon.</p>
                )}
              </TabsContent>
            </Tabs>

            <Separator />

            {/* Organizer Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      {event.organizer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-lg">{event.organizer.name}</h4>
                      {event.organizer.verified && (
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.organizer.verified ? 'Verified Event Organizer' : 'Event Organizer'}
                    </p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleCall(event.organizer.phone)}
                    className="w-full"
                    variant="outline"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button
                    onClick={() => handleWhatsApp(event.organizer.whatsapp, event.title)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleEmail(event.organizer.email, event.title)}
                    className="w-full"
                    variant="outline"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card className="bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Event Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{event.attendees}</div>
                    <div className="text-sm text-muted-foreground">Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{attendancePercentage}%</div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                  </div>
                </div>
                <div className="mt-4 bg-secondary/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${attendancePercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Event Safety Tips
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Verify event details before making payments</li>
                  <li>• Keep your tickets and confirmation safe</li>
                  <li>• Arrive early to secure good seating</li>
                  <li>• Follow event guidelines and dress code</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold gradient-text mb-8">Related Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allEvents
              .filter(e => e.category === event.category && e.id !== event.id)
              .slice(0, 4)
              .map((relatedEvent, index) => (
                <motion.div
                  key={relatedEvent.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="product-card"
                >
                  <Link to={`/event/${relatedEvent.id}`}>
                    <div className="product-content">
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedEvent.images[0]}
                          alt={relatedEvent.title}
                          className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-2 mb-2">{relatedEvent.title}</h4>
                      <p className="text-lg font-bold text-primary">
                        KSh {relatedEvent.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(relatedEvent.date).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;