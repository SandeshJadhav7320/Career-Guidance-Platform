package com.example.server.CarrerPathDetails.model;

import jakarta.persistence.*;

@Entity
public class SelectedCareerPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String title;

    @Lob @Column(columnDefinition = "TEXT")
    private String overview;

    @Lob @Column(columnDefinition = "TEXT")
    private String requiredSkills;

    @Lob @Column(columnDefinition = "TEXT")
    private String educationalPath;

    @Lob @Column(columnDefinition = "TEXT")
    private String certifications;

    @Lob @Column(columnDefinition = "TEXT")
    private String toolsAndTechnologies;

    @Lob @Column(columnDefinition = "TEXT")
    private String resources;

    @Lob @Column(columnDefinition = "TEXT")
    private String careerGrowth;

    @Lob @Column(columnDefinition = "TEXT")
    private String projects;

    @Lob @Column(columnDefinition = "TEXT")
    private String communities;

    public SelectedCareerPath() {}

    // 💡 Optional constructor
    public SelectedCareerPath(String userId, String title,
        String overview, String requiredSkills, String educationalPath,
        String certifications, String toolsAndTechnologies,
        String resources, String careerGrowth,
        String projects, String communities) {
        
        this.userId = userId;
        this.title = title;
        this.overview = overview;
        this.requiredSkills = requiredSkills;
        this.educationalPath = educationalPath;
        this.certifications = certifications;
        this.toolsAndTechnologies = toolsAndTechnologies;
        this.resources = resources;
        this.careerGrowth = careerGrowth;
        this.projects = projects;
        this.communities = communities;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(String requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public String getEducationalPath() {
		return educationalPath;
	}

	public void setEducationalPath(String educationalPath) {
		this.educationalPath = educationalPath;
	}

	public String getCertifications() {
		return certifications;
	}

	public void setCertifications(String certifications) {
		this.certifications = certifications;
	}

	public String getToolsAndTechnologies() {
		return toolsAndTechnologies;
	}

	public void setToolsAndTechnologies(String toolsAndTechnologies) {
		this.toolsAndTechnologies = toolsAndTechnologies;
	}

	public String getResources() {
		return resources;
	}

	public void setResources(String resources) {
		this.resources = resources;
	}

	public String getCareerGrowth() {
		return careerGrowth;
	}

	public void setCareerGrowth(String careerGrowth) {
		this.careerGrowth = careerGrowth;
	}

	public String getProjects() {
		return projects;
	}

	public void setProjects(String projects) {
		this.projects = projects;
	}

	public String getCommunities() {
		return communities;
	}

	public void setCommunities(String communities) {
		this.communities = communities;
	}

    // 👉 Generate getters/setters for all fields
}
