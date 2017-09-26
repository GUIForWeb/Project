var models = system.models
var Background = system.models.Background;
var Bar = system.models.Bar;
var BackgroundContextMenu = system.models.BackgroundContextMenu;
var Icon = system.models.Icon;
var DataIcon = system.models.DataIcon;
var Model = system.models.Model;
var Taskbar = system.models.Taskbar;
var WinAndBarNode = system.models.WinAndBarNode;
var Window = system.models.Window;
var IconContextMenu = system.models.IconContextMenu;

var BarManager = system.subsystem.BarManager;
var EnumEngine = system.subsystem.EnumEngine;
var EventListener = system.subsystem.EventListener;
var GUIXMLHttpRequest = system.subsystem.GUIXMLHttpRequest;
var GUIManager = system.subsystem.GUIManager;
var GUIRepository = system.subsystem.GUIRepository;
var NodeManager = system.subsystem.NodeManager;
var PositioningEngine = system.subsystem.PositioningEngine;
var WindowManager = system.subsystem.WindowManager;
var WindowSizingEngine = system.subsystem.WindowSizingEngine;
var DesktopManager = system.subsystem.DesktopManager;

var controllers = system.controllers
var Change = system.controllers.Change;
var Click = system.controllers.Click;
var Controller = system.controllers.Controller;
var Dblclick = system.controllers.Dblclick;
var Drag = system.controllers.Drag;
var Mouseout = system.controllers.Mouseout;
var Mouseover = system.controllers.Mouseover;
var Resize = system.controllers.Resize;
var Drop = system.controllers.Drop;


var subControllers = system.controllers.subControllers
var Dragend = system.controllers.subControllers.Dragend;
var Draging = system.controllers.subControllers.Draging;
var Dragstart = system.controllers.subControllers.Dragstart;
var Resizeend = system.controllers.subControllers.Resizeend;
var Resizestart = system.controllers.subControllers.Resizestart;
var Resizing = system.controllers.subControllers.Resizing;
var Dragover = system.controllers.subControllers.Dragover;

var view = system.views;
var BackgroundView = system.views.BackgroundView;
var BarView = system.views.BarView;
var BackgroundContextMenuView = system.views.BackgroundContextMenuView;
var IconView = system.views.IconView;
var TaskbarView = system.views.TaskbarView;
var WindowView = system.views.WindowView;
var IconContextMenuView = system.views.IconContextMenuView;

var DesktopWebSocket = system.webSockets.DesktopWebSocket;
