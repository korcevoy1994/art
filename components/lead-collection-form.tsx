"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export function LeadCollectionForm() {
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    functie: "",
    telefon: "",
    email: "",
    nume_companie: "",
    cod_fiscal: "",
    telefon_marketing: "",
    email_marketing: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    
    try {
      // Log form data for debugging
      console.log("Submitting form data:", formData)
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("Supabase ANON Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // Insert data into Supabase table
      const { data, error } = await supabase
        .from('leads') // Replace with your actual table name
        .insert([
          formData
        ])
      
      // Log the response for debugging
      console.log("Supabase response:", { data, error })
      
      if (error) throw error
      
      // Success handling
      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({
        nume: "",
        prenume: "",
        functie: "",
        telefon: "",
        email: "",
        nume_companie: "",
        cod_fiscal: "",
        telefon_marketing: "",
        email_marketing: "",
      })
      console.log("Form submitted successfully:", data)
    } catch (error) {
      // Error handling
      console.error("Detailed error:", error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred')
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Logo and Info (desktop version) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Modern gradient background with mesh effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5D2E] via-[#FF7A4D] to-[#FF8F6B] z-10">
          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          {/* Animated floating shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-8">
          <div className="max-w-md mx-auto">
            {/* Logo with subtle hover effect */}
            <div className="relative group mb-8 transition-all duration-500 hover:scale-105 cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative">
                <img src="/art-text.png" alt="ArtGarage" className="w-64 mx-auto" />
              </div>
            </div>
            
            {/* Modern typography with animated gradient text */}
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-4 text-balance text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 text-center tracking-tight">
                {"Doar la Moldova Urban Days"}
              </h1>
              <div className="flex items-center justify-center mb-4">
                <div className="h-px w-12 bg-white/30"></div>
                <p className="text-2xl font-semibold mx-4 text-balance text-white/90 text-center">
                  {"11-14 septembrie 2025"}
                </p>
                <div className="h-px w-12 bg-white/30"></div>
              </div>
              <p className="text-xl font-bold mb-6 text-balance text-white/90 text-center">
                {"primești beneficii pe măsură!"}
              </p>
            </div>
            
            {/* Glassmorphism card with hover effects */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02] cursor-default">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-white/5 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <div className="absolute -top-3 -left-3 bg-white/90 text-[#FF5D2E] font-black text-sm px-3 py-1 rounded-full shadow-lg border border-white/50">
                  OFERTĂ EXCLUSIVĂ
                </div>
                <p className="text-lg text-white text-pretty mb-5 leading-relaxed">
                  {"Completează formularul la expoziția Moldova Urban Days și primești garantat 10% reducere la toate serviciile și produsele Art Garage timp de 3 luni."}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg text-white text-pretty font-bold">
                    {"Semnează contractul în zilele expoziției și beneficiezi de 12% reducere timp de 6 luni!"}
                  </p>
                </div>
              </div>
            </div>
            

          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full">
            <img src="/element.png" alt="Element" className="w-96 float-right animate-float" />
          </div>
        </div>
      </div>

      {/* Mobile version of services info */}
      <div className="lg:hidden w-full relative overflow-hidden">
        {/* Modern gradient background with mesh effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5D2E] via-[#FF7A4D] to-[#FF8F6B] z-10">
          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          {/* Animated floating shapes */}
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white/10 blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white/10 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>
        
        <div className="relative z-20 flex flex-col justify-center p-4 sm:p-8">
          <div className="max-w-md mx-auto">
            {/* Logo with subtle hover effect */}
            <div className="relative group mb-6 transition-all duration-500 hover:scale-105 cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative">
                <img src="/art-text.png" alt="ArtGarage" className="w-48 mx-auto" />
              </div>
            </div>
            
            {/* Modern typography with animated gradient text */}
            <div className="mb-6">
              <h1 className="text-3xl font-black mb-3 text-balance text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 text-center tracking-tight">
                {"Doar la Moldova Urban Days"}
              </h1>
              <div className="flex items-center justify-center mb-3">
                <div className="h-px w-10 bg-white/30"></div>
                <p className="text-xl font-semibold mx-3 text-balance text-white/90 text-center">
                  {"11-14 septembrie 2025"}
                </p>
                <div className="h-px w-10 bg-white/30"></div>
              </div>
              <p className="text-lg font-bold mb-5 text-balance text-white/90 text-center">
                {"primești beneficii pe măsură!"}
              </p>
            </div>
            
            {/* Glassmorphism card with hover effects */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02] cursor-default mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-white/5 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/20">
                <div className="absolute -top-3 -left-3 bg-white/90 text-[#FF5D2E] font-black text-xs px-3 py-1 rounded-full shadow-lg border border-white/50">
                  OFERTĂ EXCLUSIVĂ
                </div>
                <p className="text-base text-white text-pretty mb-4 leading-relaxed">
                  {"Completează formularul la expoziția Moldova Urban Days și primești garantat 10% reducere la toate serviciile și produsele Art Garage timp de 3 luni."}
                </p>
                <div className="flex items-start space-x-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-base text-white text-pretty font-bold">
                    {"Semnează contractul în zilele expoziției și beneficiezi de 12% reducere timp de 6 luni!"}
                  </p>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-card">
        <Card className="w-full max-w-lg shadow-lg border-0 bg-background">
          <CardContent className="p-4 sm:p-8">
            <div className="mb-4 sm:mb-8 text-center">
              <img src="/logoa.png" alt="ArtGarage" className="w-32 sm:w-40 mx-auto mb-4" />
              <p className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">{""}</p>
              <p className="text-sm sm:text-base text-muted-foreground">{"Completează formularul pentru a primi oferte personalizate"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold text-card-foreground border-b border-border pb-2">
                  {"Date de Contact"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nume" className="text-sm font-medium text-card-foreground">
                      {"Nume"}
                    </Label>
                    <Input
                      id="nume"
                      type="text"
                      value={formData.nume}
                      onChange={(e) => handleInputChange("nume", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="Introduceți numele"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prenume" className="text-sm font-medium text-card-foreground">
                      {"Prenume"}
                    </Label>
                    <Input
                      id="prenume"
                      type="text"
                      value={formData.prenume}
                      onChange={(e) => handleInputChange("prenume", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="Introduceți prenumele"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="functie" className="text-sm font-medium text-card-foreground">
                    {"Funcție"}
                  </Label>
                  <Input
                    id="functie"
                    type="text"
                    value={formData.functie}
                    onChange={(e) => handleInputChange("functie", e.target.value)}
                    className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                    placeholder="Introduceți funcția"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefon" className="text-sm font-medium text-card-foreground">
                      {"Nr. telefon"}
                    </Label>
                    <Input
                      id="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => handleInputChange("telefon", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="+373 xx xxx xxx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                      {"E-mail"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="email@exemplu.md"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold text-card-foreground border-b border-border pb-2">
                  {"Informații Companie"}
                </p>

                <div className="space-y-2">
                  <Label htmlFor="nume_companie" className="text-sm font-medium text-card-foreground">
                    {"Nume Companie"}
                  </Label>
                  <Input
                    id="nume_companie"
                    type="text"
                    value={formData.nume_companie}
                    onChange={(e) => handleInputChange("nume_companie", e.target.value)}
                    className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                    placeholder="Introduceți numele companiei"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cod_fiscal" className="text-sm font-medium text-card-foreground">
                    {"Cod fiscal"}
                  </Label>
                  <Input
                    id="cod_fiscal"
                    type="text"
                    value={formData.cod_fiscal}
                    onChange={(e) => handleInputChange("cod_fiscal", e.target.value)}
                    className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                    placeholder="Introduceți codul fiscal"
                  />
                </div>
              </div>

              {/* Marketing Department Contact Information */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold text-card-foreground border-b border-border pb-2">
                  {"Contacte dep. marketing"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefon_marketing" className="text-sm font-medium text-card-foreground">
                      {"Telefon *"}
                    </Label>
                    <Input
                      id="telefon_marketing"
                      type="tel"
                      value={formData.telefon_marketing}
                      onChange={(e) => handleInputChange("telefon_marketing", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="+373 xx xxx xxx"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email_marketing" className="text-sm font-medium text-card-foreground">
                      {"Email *"}
                    </Label>
                    <Input
                      id="email_marketing"
                      type="email"
                      value={formData.email_marketing}
                      onChange={(e) => handleInputChange("email_marketing", e.target.value)}
                      className="transition-all duration-300 hover:border-accent focus:border-accent focus:ring-accent/20 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                      placeholder="marketing@exemplu.md"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isSubmitting ? "Se trimite..." : "Trimite Solicitarea"}
              </Button>
              
              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  Solicitarea a fost trimisă cu succes! Vă vom contacta în curând.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  <p>A apărut o eroare la trimiterea formularului.</p>
                  {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                </div>
              )}
            </form>
            
            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
                Contactează-ne
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>078 88 60 33</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>068 08 41 50</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@artgarage.md</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>str. Petricani 17A</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <a href="https://www.instagram.com/artgarage.creative.studio/" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{color: '#FF5D2E'}}>
                    @artgarage.creative.studio
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
