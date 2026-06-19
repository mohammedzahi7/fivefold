// ==========================================================================
// CUSTOM CURSOR GLOW EFFECT
// ==========================================================================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

// Add scaling glow when hovering interactive elements
const interactives = document.querySelectorAll('a, button, .team-card, .service-card, .pillar-card, .portfolio-item, .filter-btn, input, select, textarea');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorGlow) {
            cursorGlow.style.width = '350px';
            cursorGlow.style.height = '350px';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorGlow) {
            cursorGlow.style.width = '250px';
            cursorGlow.style.height = '250px';
        }
    });
});


// ==========================================================================
// MOUSE-FOLLOW SPOTLIGHT GLOW FOR CARDS (LUXURY INTERACTION)
// ==========================================================================
const spotlightCards = document.querySelectorAll('.team-card, .service-card, .pillar-card');
spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});


// ==========================================================================
// SCROLL PARALLAX FOR GEOMETRIC BACKDROPS
// ==========================================================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax on Hero floating pentagons
    const pentagon1 = document.querySelector('.pentagon-1');
    const pentagon2 = document.querySelector('.pentagon-2');
    if (pentagon1) {
        pentagon1.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.04}deg)`;
    }
    if (pentagon2) {
        pentagon2.style.transform = `translateY(-${scrolled * 0.15}px) rotate(-${scrolled * 0.03}deg)`;
    }

    // Parallax on About pentagon outlines
    const aboutPentagon = document.querySelector('.about-pentagon-outline');
    if (aboutPentagon) {
        aboutPentagon.style.transform = `translateY(${scrolled * 0.12}px) rotate(${25 + scrolled * 0.02}deg)`;
    }
});


// ==========================================================================
// SCROLL-SENSITIVE STICKY HEADER & ACTIVE LINKS NAVIGATION
// ==========================================================================
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Add scroll class to navbar
    if (header) {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle Mobile CTA Visibility on Scroll
    const mobileCTA = document.getElementById('mobileFloatingCTA');
    if (mobileCTA) {
        if (window.scrollY > 300) {
            mobileCTA.classList.add('visible');
        } else {
            mobileCTA.classList.remove('visible');
        }
    }

    // Scroll spy: Update active nav links for local anchor links only
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.classList.remove('active');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        }
    });
});


// ==========================================================================
// MOBILE NAVIGATION MENU BURGER TOGGLE
// ==========================================================================
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
    });
}

if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavToggle) mobileNavToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
        });
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        if (mobileNavToggle) mobileNavToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    });
}


// ==========================================================================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide, .reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});


// ==========================================================================
// ANIMATED STATS COUNTER
// ==========================================================================
const statNumbers = document.querySelectorAll('.stat-number');
const aboutSection = document.getElementById('about');
let statsAnimated = false;

const startStatsAnimation = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1800; // 1.8 seconds
        const startTime = performance.now();

        const updateStats = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Cubic easeOut calculation for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easeProgress * target);
            
            stat.innerText = value + (target === 100 || target === 10 ? '+' : '');

            if (progress < 1) {
                requestAnimationFrame(updateStats);
            } else {
                stat.innerText = target + (target === 100 || target === 10 ? '+' : '');
            }
        };

        requestAnimationFrame(updateStats);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            startStatsAnimation();
            statsAnimated = true;
        }
    });
}, {
    threshold: 0.25
});

if (aboutSection) {
    statsObserver.observe(aboutSection);
}


// ==========================================================================
// PORTFOLIO FILTERING GRID LOGIC
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});


// ==========================================================================
// TESTIMONIAL SLIDER CAROUSEL
// ==========================================================================
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('#sliderDots .dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let currentSlide = 0;
let slideInterval;

const updateSlider = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

const nextSlide = () => {
    updateSlider(currentSlide + 1);
};

const prevSlide = () => {
    updateSlider(currentSlide - 1);
};

const startSlideInterval = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
};

if (slides.length > 0 && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideInterval();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
            updateSlider(slideIndex);
            startSlideInterval();
        });
    });

    startSlideInterval();
}


// ==========================================================================
// PORTFOLIO MODAL & PROJECT DETAIL OVERLAY
// ==========================================================================
const projectModal = document.getElementById('projectModal');

window.openProjectModal = (client, category, imgSrc, description) => {
    const modalTitle = document.getElementById('modalTitle');
    const modalTag = document.getElementById('modalTag');
    const modalDesc = document.getElementById('modalDesc');
    const modalMedia = document.getElementById('modalMedia');
    
    modalTitle.innerText = client;
    modalTag.innerText = category;
    modalDesc.innerText = description;
    
    if (imgSrc) {
        modalMedia.innerHTML = `<img src="${imgSrc}" alt="${client}" class="modal-img">`;
    } else {
        let gradClass = 'color-grad-1';
        let iconClass = 'fa-file-video';
        
        if (category.toLowerCase() === 'corporate') { gradClass = 'color-grad-1'; iconClass = 'fa-building'; }
        else if (category.toLowerCase() === 'events') { gradClass = 'color-grad-2'; iconClass = 'fa-glass-cheers'; }
        else if (category.toLowerCase() === 'photography') { gradClass = 'color-grad-3'; iconClass = 'fa-camera-retro'; }
        else if (category.toLowerCase() === 'social media') { gradClass = 'color-grad-4'; iconClass = 'fa-instagram'; }
        
        modalMedia.innerHTML = `
            <div class="portfolio-placeholder-media ${gradClass}">
                <i class="fas ${iconClass} media-icon"></i>
                <span>${client} Case Study</span>
            </div>
        `;
    }
    
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = () => {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
};

window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
    if (e.target === document.getElementById('successModal')) {
        closeSuccessModal();
    }
});


// ==========================================================================
// CONTACT FORM HANDLERS & WHATSAPP INTEGRATIONS
// ==========================================================================
const successModal = document.getElementById('successModal');
const contactForm = document.getElementById('contactForm');

window.handleFormSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const phone = document.getElementById('formPhone').value;
    const email = document.getElementById('formEmail').value;
    const company = document.getElementById('formCompany').value || 'N/A';
    const service = document.getElementById('formService').value;
    const budget = document.getElementById('formBudget').value;
    const message = document.getElementById('formMessage').value;

    const summaryCard = document.getElementById('successSummaryCard');
    summaryCard.innerHTML = `
        <div class="summary-row">
            <span class="summary-label">Name</span>
            <span class="summary-val">${name}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Phone</span>
            <span class="summary-val">${phone}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Email</span>
            <span class="summary-val">${email}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Company</span>
            <span class="summary-val">${company}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Service</span>
            <span class="summary-val">${service}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Budget Scope</span>
            <span class="summary-val">${budget}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Details</span>
            <span class="summary-val" style="font-size: 0.75rem; font-weight: normal; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${message}</span>
        </div>
    `;

    const btnForward = document.getElementById('btnForwardWhatsApp');
    btnForward.onclick = () => {
        const text = `Hi FiveFold Productions,\n\n*I would like to inquire about your production services:*\n\n` + 
                     `• *Name:* ${name}\n` +
                     `• *Phone:* ${phone}\n` +
                     `• *Email:* ${email}\n` +
                     `• *Company:* ${company}\n` +
                     `• *Service Required:* ${service}\n` +
                     `• *Budget Range:* ${budget}\n` +
                     `• *Project Details:* ${message}`;
        
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919400531192?text=${encodedText}`, '_blank');
    };

    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    contactForm.reset();
};

window.closeSuccessModal = () => {
    successModal.classList.remove('show');
    document.body.style.overflow = '';
};

window.triggerWhatsAppConsultation = () => {
    const name = document.getElementById('formName').value || 'Visitor';
    const service = document.getElementById('formService').value || 'Videography/Photography';
    const message = `Hi FiveFold Productions, my name is ${name}. I am looking for creative support with "${service}" services. I would like to schedule a call.`;
    
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/919400531192?text=${encodedText}`, '_blank');
};


// ==========================================================================
// SCROLL-TO-TOP BUTTON INDICATOR
// ==========================================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================================================
// TEAM CAROUSEL SLIDER UPGRADE (INFINITE LOOP, SWIPE/DRAG & SHOWCASE EFFECT)
// ==========================================================================
const initTeamCarousel = () => {
    const slider = document.getElementById('teamSlider');
    if (!slider) return;
    if (slider.classList.contains('initialized')) return;
    slider.classList.add('initialized');

    const prevBtn = document.getElementById('teamPrev');
    const nextBtn = document.getElementById('teamNext');
    const dotsContainer = document.getElementById('teamDots');

    // Get original cards
    const originalCards = Array.from(slider.querySelectorAll('.team-card'));
    if (originalCards.length === 0) return;

    const totalOriginal = originalCards.length;
    const numToClone = 3; // Clone 3 cards to support up to 3 cards per view safely

    // 1. DYNAMICALLY DUPLICATE CARDS FOR INFINITE LOOP
    // Clear initial reveal animations on clones to avoid styling delays when wrapping
    const clonesEnd = originalCards.slice(0, numToClone).map(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('reveal-up', 'reveal-fade', 'reveal-left', 'reveal-right', 'visible');
        clone.classList.add('cloned-card');
        return clone;
    });

    const clonesStart = originalCards.slice(-numToClone).map(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('reveal-up', 'reveal-fade', 'reveal-left', 'reveal-right', 'visible');
        clone.classList.add('cloned-card');
        return clone;
    });

    // Rebuild track with clones prepended and appended
    slider.innerHTML = '';
    clonesStart.forEach(clone => slider.appendChild(clone));
    originalCards.forEach(card => slider.appendChild(card));
    clonesEnd.forEach(clone => slider.appendChild(clone));

    // Update references
    const allCards = Array.from(slider.querySelectorAll('.team-card'));

    // 2. STATE VARIABLES
    let teamCurrentIndex = numToClone; // Start at the first original card
    let isDragging = false;
    let startX = 0;
    let dragDeltaX = 0;
    let autoplayTimer = null;

    // 3. RESPONSIVE CONTROLS
    const getCardsPerView = () => {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1025) return 2;
        return 3;
    };

    const getTranslateOffset = (index) => {
        const cardWidth = originalCards[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(slider).gap) || 32;
        return -index * (cardWidth + gap);
    };

    // 4. DISPLAY CONTROLS
    const updateTransform = (offset = null) => {
        const targetOffset = offset !== null ? offset : getTranslateOffset(teamCurrentIndex);
        slider.style.transform = `translateX(${targetOffset}px)`;
    };

    const updateActiveClasses = () => {
        allCards.forEach(card => card.classList.remove('center-card'));

        const cardsPerView = getCardsPerView();
        let centerIdx = teamCurrentIndex;

        // Center card is offset depending on current view size
        if (cardsPerView === 3) {
            centerIdx = teamCurrentIndex + 1; // Middle card of 3
        } else if (cardsPerView === 2) {
            centerIdx = teamCurrentIndex; // Left card of 2
        }

        if (allCards[centerIdx]) {
            allCards[centerIdx].classList.add('center-card');
        }

        // Map center card to original index (0 to totalOriginal - 1) to update dots
        const originalIdx = (centerIdx - numToClone + totalOriginal) % totalOriginal;

        // Synchronize dots
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === originalIdx) {
                dot.classList.add('active');
            }
        });
    };

    const updateTeamSlider = (withTransition = true) => {
        slider.style.transition = withTransition ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
        updateTransform();
        updateActiveClasses();
    };

    // 5. SEAMLESS WRAP SNAP CHECK
    const snapIfNeeded = () => {
        if (teamCurrentIndex < numToClone) {
            teamCurrentIndex += totalOriginal;
            updateTeamSlider(false);
        } else if (teamCurrentIndex >= totalOriginal + numToClone) {
            teamCurrentIndex -= totalOriginal;
            updateTeamSlider(false);
        }
    };

    slider.addEventListener('transitionend', () => {
        snapIfNeeded();
    });

    // 6. GESTURES & DRAGGING (MOUSE & TOUCH)
    const dragStart = (e) => {
        stopAutoplay();
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        dragDeltaX = 0;
        slider.classList.add('dragging');
    };

    const dragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.pageX || e.touches[0].pageX;
        dragDeltaX = currentX - startX;

        // Apply real-time translation during drag
        const baseTranslate = getTranslateOffset(teamCurrentIndex);
        updateTransform(baseTranslate + dragDeltaX);
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('dragging');

        const dragThreshold = 50; // Snapping boundary
        if (dragDeltaX < -dragThreshold) {
            teamCurrentIndex++;
        } else if (dragDeltaX > dragThreshold) {
            teamCurrentIndex--;
        }

        updateTeamSlider(true);
        startAutoplay();
    };

    // Bind Pointer Listeners
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);

    // Bind Touch Listeners
    slider.addEventListener('touchstart', dragStart, { passive: true });
    slider.addEventListener('touchmove', dragMove, { passive: true });
    slider.addEventListener('touchend', dragEnd);

    // 7. AUTOPLAY SYSTEM
    const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            teamCurrentIndex++;
            updateTeamSlider(true);
        }, 5000);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    startAutoplay();

    // Pause Autoplay on Hover
    const parentContainer = slider.closest('.team-slider-container');
    if (parentContainer) {
        parentContainer.addEventListener('mouseenter', stopAutoplay);
        parentContainer.addEventListener('mouseleave', startAutoplay);
    }

    // 8. BUTTON CONTROLS
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            teamCurrentIndex++;
            updateTeamSlider(true);
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            teamCurrentIndex--;
            updateTeamSlider(true);
            startAutoplay();
        });
    }

    // 9. DOT CONTROLS
    if (dotsContainer) {
        // Re-generate dots based on original cards count to ensure synchronicity
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalOriginal; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', i);
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', (e) => {
                stopAutoplay();
                const slideTarget = parseInt(e.target.getAttribute('data-slide'), 10);
                
                // Set index relative to numToClone
                teamCurrentIndex = slideTarget + numToClone;
                updateTeamSlider(true);
                startAutoplay();
            });
        }
    }

    // 10. RESIZE ADJUSTMENTS
    window.addEventListener('resize', () => {
        slider.style.transition = 'none';
        updateTransform();
        updateActiveClasses();
        // Force layout pass
        slider.offsetHeight;
        slider.style.transition = '';
    });

    // Run initial positioning
    setTimeout(() => {
        updateTeamSlider(false);
    }, 150);
};

// Initialize after DOM and resources load
window.addEventListener('load', () => {
    initTeamCarousel();
});
document.addEventListener('DOMContentLoaded', () => {
    initTeamCarousel();
});



