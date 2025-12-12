"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JoinDialog from '@/components/JoinDialog';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ContactClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent Successfully!",
            description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
        });

        setFormData({
            name: '',
            email: '',
            phone: '',
            inquiryType: '',
            subject: '',
            message: ''
        });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const inquiryTypes = [
        { value: 'parent', label: 'Parent Inquiry' },
        { value: 'school', label: 'School Partnership' },
        { value: 'enterprise', label: 'Enterprise Training' },
        { value: 'media', label: 'Media & Press' },
        { value: 'careers', label: 'Career Opportunities' },
        { value: 'other', label: 'Other' }
    ];

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

                <main className="flex-1 pt-20">
                    {/* Hero Section */}
                    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                        <div className="container">
                            <Breadcrumb items={[{ name: 'Contact', url: '/contact' }]} />

                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                    Let's Start a <span className="text-primary">Conversation</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                    Whether you're a parent curious about our programs, a school looking to partner,
                                    or an organization interested in youth development, we'd love to hear from you.
                                    Our team is ready to answer your questions and help you find the right solution.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form & Info */}
                    <section className="py-20">
                        <div className="container">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Contact Form */}
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
                                    <p className="text-muted-foreground mb-8">
                                        Fill out the form below and our team will get back to you within 24-48 hours.
                                        For urgent inquiries, please call us directly.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your full name"
                                                    required
                                                    aria-required="true"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your.email@example.com"
                                                    required
                                                    aria-required="true"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="inquiryType">Inquiry Type *</Label>
                                                <Select
                                                    value={formData.inquiryType}
                                                    onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                                                    required
                                                >
                                                    <SelectTrigger id="inquiryType">
                                                        <SelectValue placeholder="Select inquiry type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {inquiryTypes.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="What is your inquiry about?"
                                                required
                                                aria-required="true"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Please provide details about your inquiry..."
                                                rows={6}
                                                required
                                                aria-required="true"
                                            />
                                        </div>

                                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                                            {isSubmitting ? (
                                                'Sending...'
                                            ) : (
                                                <>
                                                    Send Message <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-8">
                                    {/* Quick Help */}
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-accent" />
                                                Response Time
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                We typically respond to all inquiries within 24-48 hours during business days.
                                                For urgent matters, please call us directly during our business hours.
                                            </p>
                                            <div className="bg-muted rounded-lg p-4">
                                                <p className="font-medium text-foreground">Business Hours</p>
                                                <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
                                                <p className="text-muted-foreground">Sunday: Closed</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* For Schools */}
                                    <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Building className="h-5 w-5 text-accent" />
                                                For Schools & Institutions
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-primary-foreground/80 mb-4">
                                                Interested in bringing SkillPreneurZ programs to your school? We offer
                                                comprehensive partnership packages that include curriculum integration,
                                                teacher training, and ongoing support.
                                            </p>
                                            <ul className="space-y-2 text-primary-foreground/80 mb-6">
                                                <li>• Customized curriculum for your school's needs</li>
                                                <li>• Professional development for teachers</li>
                                                <li>• Student progress tracking and reporting</li>
                                                <li>• Dedicated partnership manager</li>
                                            </ul>
                                            <Button variant="secondary" asChild>
                                                <Link href="/courses">Learn About Partnerships</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* For Parents */}
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-accent" />
                                                For Parents
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                Want to enroll your child in our programs? Book a free trial session to
                                                experience our teaching methodology firsthand. No commitment required.
                                            </p>
                                            <Button onClick={() => setJoinDialogOpen(true)}>
                                                Book a Free Trial
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Teaser */}
                    <section className="py-16 bg-muted">
                        <div className="container text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                Have More Questions?
                            </h2>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Check out our frequently asked questions or browse our blog for more information
                                about our programs and teaching methodology.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button variant="outline" asChild>
                                    <Link href="/about">About SkillPreneurZ</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/blog">Read Our Blog</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
                <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
            </div>
        </>
    );
};

export default ContactClient;
