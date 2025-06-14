```python
from manim import *

class PythagorasTheorem(Scene):
    def construct(self):
        self.camera.background_color = "#111111"

        # Define colors
        blue = BLUE_D
        yellow = YELLOW_D
        white = WHITE

        # Define the right triangle
        triangle = Polygon([0, 0, 0], [4, 0, 0], [4, 3, 0], color=white, fill_opacity=0.5)
        a = Line([0, 0, 0], [4, 0, 0], color=blue, stroke_width=5)
        b = Line([4, 0, 0], [4, 3, 0], color=yellow, stroke_width=5)
        c = Line([0, 0, 0], [4, 3, 0], color=RED_D, stroke_width=5)

        # Labels for the sides
        a_label = MathTex("a", color=blue).next_to(a, DOWN)
        b_label = MathTex("b", color=yellow).next_to(b, RIGHT)
        c_label = MathTex("c", color=RED_D).next_to(c, UP)

        # Right angle symbol
        right_angle = RightAngle(a, b, length=0.4, color=white)

        # Group triangle elements
        triangle_group = VGroup(triangle, a, b, c, a_label, b_label, c_label, right_angle).move_to(LEFT * 3)

        # Squares on each side
        square_a = Square(side_length=4, color=blue, fill_opacity=0.3).move_to([2, -2, 0])
        square_b = Square(side_length=3, color=yellow, fill_opacity=0.3).move_to([5.5, 1.5, 0])
        square_c = Square(side_length=5, color=RED_D, fill_opacity=0.3).move_to([7, -0.5, 0])

        # Labels for the squares
        a_squared = MathTex("a^2", color=blue).move_to(square_a.get_center())
        b_squared = MathTex("b^2", color=yellow).move_to(square_b.get_center())
        c_squared = MathTex("c^2", color=RED_D).move_to(square_c.get_center())

        # Equation
        equation = MathTex("a^2 + b^2 = c^2", color=white).move_to(DOWN * 2.5)

        # Explanation text
        explanation = Text("Pythagorean Theorem", color=white).move_to(UP * 3)

        # Animation
        self.play(Write(explanation))
        self.wait(0.5)
        self.play(Create(triangle_group))
        self.wait(1)
        self.play(
            Create(square_a),
            Create(square_b),
            Create(square_c),
        )
        self.play(
            Write(a_squared),
            Write(b_squared),
            Write(c_squared),
        )
        self.wait(1)
        self.play(Write(equation))
        self.wait(2)
        self.play(FadeOut(explanation, triangle_group, square_a, square_b, square_c, a_squared, b_squared, c_squared, equation))
        self.wait(0.5)

        # Second approach using squares filling the larger square
        square_c_background = Square(side_length=5, color=RED_D, fill_opacity=0.1).move_to(ORIGIN)
        square_a_fill = Square(side_length=4, color=blue, fill_opacity=0.7).move_to(ORIGIN)
        square_b_fill = Square(side_length=3, color=yellow, fill_opacity=0.7).move_to(ORIGIN)

        square_a_fill.shift(RIGHT * 1.5 + UP * 1.5)  # Position inside square_c
        square_b_fill.shift(LEFT * 1.5 + DOWN * 1.5)

        # Labels for sides
        a_side_label = MathTex("a^2", color=blue).move_to(square_a_fill.get_center())
        b_side_label = MathTex("b^2", color=yellow).move_to(square_b_fill.get_center())
        c_squared_label = MathTex("c^2", color=RED_D).move_to(UP * 3)

        self.play(Create(square_c_background),Write(c_squared_label))
        self.wait(0.5)
        self.play(
            square_a_fill.animate.move_to(square_c_background.get_center()),
            square_b_fill.animate.move_to(square_c_background.get_center()),
        )
        self.play(
             Write(a_side_label),
            Write(b_side_label)
        )
        self.wait(2)
        self.play(FadeOut(square_c_background, square_a_fill, square_b_fill, a_side_label,b_side_label, c_squared_label))
        self.wait(0.5)
```