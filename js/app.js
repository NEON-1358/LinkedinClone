// Main application functionality
class App {
    static init() {
        this.loadUserProfile();
        this.attachEventListeners();
    }

    static loadUserProfile() {
        const currentUser = Auth.getCurrentUser();
        if (!currentUser) return;

        // Update user name displays
        const userNameElements = document.querySelectorAll('#userFullName, #profileFullName');
        userNameElements.forEach(el => {
            if (el) el.textContent = currentUser.fullName;
        });

        // Update user title displays
        const userTitleElements = document.querySelectorAll('#userTitle, #profileTitle');
        userTitleElements.forEach(el => {
            if (el) el.textContent = currentUser.title;
        });

        // Update user location
        const locationElement = document.getElementById('profileLocation');
        if (locationElement) locationElement.textContent = currentUser.location;

        // Update connections count
        const connectionsElement = document.getElementById('profileConnections');
        if (connectionsElement) connectionsElement.textContent = `${currentUser.connections}+ connections`;
    }

    static attachEventListeners() {
        // Post composer placeholder interaction
        const postInput = document.querySelector('.composer-header input');
        if (postInput) {
            postInput.addEventListener('click', function() {
                alert('Post composer feature coming soon!');
            });
        }

        // Post action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim().split(' ')[1]; // Get action name
                alert(`${action} feature coming soon!`);
            });
        });

        // Composer action buttons
        const composerButtons = document.querySelectorAll('.composer-btn');
        composerButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim().split(' ')[1]; // Get action name
                alert(`${action} upload feature coming soon!`);
            });
        });

        // Connect buttons
        const connectButtons = document.querySelectorAll('.connect-btn');
        connectButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.textContent = 'Pending';
                this.disabled = true;
                this.style.backgroundColor = '#666666';
                alert('Connection request sent!');
            });
        });

        // Suggestion action buttons
        const suggestionButtons = document.querySelectorAll('.suggestion-actions .btn-primary');
        suggestionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.textContent = 'Pending';
                this.disabled = true;
                this.style.backgroundColor = '#666666';
                alert('Connection request sent!');
            });
        });

        // Invitation action buttons
        const acceptButtons = document.querySelectorAll('.invitation-actions .btn-primary');
        acceptButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const invitationItem = this.closest('.invitation-item');
                if (invitationItem) {
                    invitationItem.style.display = 'none';
                    alert('Connection accepted!');
                }
            });
        });

        const ignoreButtons = document.querySelectorAll('.invitation-actions .btn-secondary');
        ignoreButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const invitationItem = this.closest('.invitation-item');
                if (invitationItem) {
                    invitationItem.style.display = 'none';
                    alert('Invitation ignored!');
                }
            });
        });

        // News item clicks
        const newsItems = document.querySelectorAll('.news-item h4');
        newsItems.forEach(item => {
            item.addEventListener('click', function() {
                alert('News article feature coming soon!');
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query) {
                        alert(`Search functionality coming soon! You searched for: "${query}"`);
                    }
                }
            });
        }

        // Navigation menu items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (!item.href || item.href.includes('#')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const navText = this.querySelector('span:last-child').textContent;
                    alert(`${navText} feature coming soon!`);
                });
            }
        });

        // Profile action buttons
        const profileActionBtns = document.querySelectorAll('.profile-actions .btn-primary, .profile-actions .btn-secondary');
        profileActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim();
                alert(`${action} feature coming soon!`);
            });
        });

        // Menu items in connections page
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (!item.classList.contains('active')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert(`${this.textContent} feature coming soon!`);
                });
            }
        });

        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`${this.textContent} page coming soon!`);
            });
        });

        // Sidebar section interactions
        const sidebarSections = document.querySelectorAll('.sidebar-section');
        sidebarSections.forEach(section => {
            const clickableElements = section.querySelectorAll('h4, p, button');
            clickableElements.forEach(el => {
                if (!el.onclick && el.tagName !== 'BUTTON') {
                    el.style.cursor = 'pointer';
                    el.addEventListener('click', function() {
                        alert('Feature coming soon!');
                    });
                }
            });
        });
    }

    static generateSampleData() {
        // This could be used to generate more dynamic content
        const samplePosts = [
            {
                author: "Alex Johnson",
                title: "Senior Developer at InnovTech",
                time: "3h",
                content: "Just finished implementing a new microservices architecture. Excited about the performance improvements! 🚀",
                reactions: 42,
                comments: 12
            },
            {
                author: "Sarah Williams",
                title: "UX Designer at CreativeCorp",
                time: "6h",
                content: "Design thinking workshop was incredible today. Love collaborating with such talented teams!",
                reactions: 28,
                comments: 7
            }
        ];

        return samplePosts;
    }

    static addInteractiveFeatures() {
        // Add some interactive features to make the app feel more alive
        
        // Animate profile stats
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.addEventListener('click', function() {
                const currentValue = parseInt(this.textContent);
                this.textContent = currentValue + 1;
            });
        });

        // Add hover effects to cards
        const cards = document.querySelectorAll('.post, .profile-card, .suggestion-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                this.style.transition = 'all 0.2s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });

        // Add typing indicator simulation
        const composerInput = document.querySelector('.composer-header input');
        if (composerInput) {
            let typingTimeout;
            composerInput.addEventListener('input', function() {
                clearTimeout(typingTimeout);
                
                // Show typing indicator (could be enhanced)
                typingTimeout = setTimeout(() => {
                    // Hide typing indicator
                }, 1000);
            });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
    App.addInteractiveFeatures();
    
    // Add some dynamic content updates
    setTimeout(() => {
        const newsItems = document.querySelectorAll('.news-item span');
        newsItems.forEach(item => {
            if (item.textContent.includes('ago')) {
                // Simulate live updates by randomly updating reader counts
                const match = item.textContent.match(/(\d+,?\d*) readers/);
                if (match) {
                    const currentReaders = parseInt(match[1].replace(',', ''));
                    const newReaders = currentReaders + Math.floor(Math.random() * 10);
                    item.textContent = item.textContent.replace(match[1], newReaders.toLocaleString());
                }
            }
        });
    }, 5000);
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
