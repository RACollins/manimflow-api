from manim import *

class GenScene(Scene):
    def construct(self):
        nodes = [Dot(point=2*np.array([np.cos(angle), np.sin(angle), 0])) for angle in [0, np.pi/3, 2*np.pi/3, np.pi, 4*np.pi/3, 5*np.pi/3]]
        edges = [Line(nodes[i].get_center(), nodes[j].get_center()) for i in range(6) for j in range(i+1, 6)]
        
        self.play(*[Create(node) for node in nodes])
        self.play(*[Create(edge) for edge in edges])