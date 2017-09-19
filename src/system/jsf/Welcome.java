package system.jsf;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;

@Named
@RequestScoped
public class Welcome{
	public Welcome(){
	}
	@PostConstruct
	public void init() {
		FacesContext context = FacesContext.getCurrentInstance();
		context.getApplication().getNavigationHandler().handleNavigation(context, null, "/WEB-INF/xhtml/form/login.jsf");
	}
}
