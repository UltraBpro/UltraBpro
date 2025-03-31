import { useState, useEffect } from 'react';

// Custom hook to load project images
const useProjectImages = (folderName) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!folderName) {
      setImages([]);
      setLoading(false);
      return;
    }
    
    // Function to import all images from a folder
    const loadImages = async () => {
      try {
        // This uses Vite's import.meta.glob to dynamically import images
        const imageFiles = import.meta.glob('/public/projects/**/*.{png,jpg,jpeg,gif,webp}', { eager: true });
        
        // Filter images that belong to the current project folder
        const folderPath = `/public/projects/${folderName}/`;
        const projectImages = Object.entries(imageFiles)
          .filter(([path]) => path.startsWith(folderPath))
          .map(([path, module]) => ({
            path: path.replace('/public', ''),
            url: module.default || path.replace('/public', '')
          }));
        
        // Sort images to ensure logo.png comes first
        projectImages.sort((a, b) => {
          if (a.path.includes('logo')) return -1;
          if (b.path.includes('logo')) return 1;
          return a.path.localeCompare(b.path);
        });
        
        setImages(projectImages);
      } catch (error) {
        console.error("Error loading project images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, [folderName]);
  
  return { images, loading };
};

// ProjectDetails component
const ProjectDetails = ({ project, onBack }) => {
  // Use a ref to maintain state across renders
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { images, loading } = useProjectImages(project.folderName);
  
  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project.id]);
  
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };
  
  return (
    <div className="project-details">
      <button className="back-button" onClick={onBack}>
        BACK
      </button>
      <div className="project-card-large">
        <div className="project-gallery">
          {loading ? (
            <div className="loading-indicator">Loading images...</div>
          ) : images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex].url}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                className="gallery-image"
              />
              {images.length > 1 && (
                <div className="gallery-controls">
                  <button className="gallery-nav prev" onClick={prevImage}>
                    ◀
                  </button>
                  <div className="gallery-indicator">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                  <button className="gallery-nav next" onClick={nextImage}>
                    ▶
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-images">No images available</div>
          )}
        </div>
        
        <div className="project-info">
          <h3>{project.name}</h3>
          <div className="project-position">
            <span>Position:</span> {project.position}
          </div>
          <p>{project.description}</p>
          <div className="tech-stack">
            <h4>TECH STACK:</h4>
            <ul>
              {project.tech.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="project-links">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button"
            >
              VIEW CODE
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-button"
              >
                VIEW DEMO
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 