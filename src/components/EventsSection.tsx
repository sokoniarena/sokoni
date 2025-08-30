import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Phone, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { allEvents } from '@/data/eventData';

const EventsSection = () => {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string, eventTitle: string) => {
    const message = `Hi! I'm interested in attending: ${eventTitle}. Could you provide more details about tickets and registration?`;
    window.open(`https://wa.me/254${phone.slice(1)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = (email: string, eventTitle: string) => {
    const subject = `Inquiry about: ${eventTitle}`;
    const body = `Hi,\n\nI'm interested in attending: ${eventTitle}\n\nCould you please provide more information about:\n- Ticket availability\n- Registration process\n- Event schedule\n- Any special requirements\n\nThanks!\n\nBest regards`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-light-purple/10 to-light-pink/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-hot-deal rounded-full mb-6">
            <Calendar className="w-6 h-6 mr-2 text-primary" />
            <span className="font-bold text-primary">Upcoming Events</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Discover Amazing Events in Kenya
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From tech conferences to cultural festivals, find and attend the most exciting events happening across Kenya. 
            Connect with like-minded people and create unforgettable experiences.
          </p>
        </motion.div>

        {/* Featured Events */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold gradient-text mb-8">Featured Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.filter(event => event.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="hot-deal-glow"
              >
                <Link to={`/event/${event.id}`}>
                  <Card className="hot-deal-content overflow-hidden cursor-pointer group">
                    <div className="relative">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      {event.originalPrice && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                          Save {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}%
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{event.title}</h3>
                          <p className="text-muted-foreground line-clamp-2">{event.description}</p>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.venue}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.attendees}/{event.capacity}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">
                              KSh {event.price.toLocaleString()}
                            </span>
                            {event.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                KSh {event.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round((event.attendees / event.capacity) * 100)}% Full
                          </Badge>
                        </div>

                        {/* Organizer Info */}
                        <div className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs">
                              {event.organizer.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-xs">{event.organizer.name}</span>
                              {event.organizer.verified && (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">Organizer</span>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-3 gap-1">
                          <Button
                            onClick={() => handleCall(event.organizer.phone)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleWhatsApp(event.organizer.whatsapp, event.title)}
                            variant="outline"
                            size="sm"
                            className="w-full bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleEmail(event.organizer.email, event.title)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Events */}
        <div>
          <h3 className="text-2xl font-bold gradient-text mb-8">All Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.filter(event => !event.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card group"
              >
                <Link to={`/event/${event.id}`}>
                  <Card className="product-content overflow-hidden cursor-pointer">
                    <div className="relative">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-base text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.venue}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendees}/{event.capacity} attendees
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            KSh {event.price.toLocaleString()}
                          </span>
                          <Badge variant="outline">
                            {Math.round((event.attendees / event.capacity) * 100)}% Full
                          </Badge>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-3 gap-1">
                          <Button
                            onClick={() => handleCall(event.organizer.phone)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleWhatsApp(event.organizer.whatsapp, event.title)}
                            variant="outline"
                            size="sm"
                            className="w-full bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleEmail(event.organizer.email, event.title)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Want to Advertise Your Event?
            </h3>
            <p className="text-muted-foreground mb-6">
              Reach thousands of potential attendees by listing your event on Sokoni Arena. 
              From conferences to festivals, we help you connect with your target audience.
            </p>
            <Link to="/list-event">
              <Button className="btn-hero px-8 py-4 text-lg">
                List Your Event
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;