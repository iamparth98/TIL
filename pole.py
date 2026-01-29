import ezdxf
from ezdxf.enums import TextEntityAlignment

def create_solar_pole_dxf():
    # Create a new DXF document.
    doc = ezdxf.new(dxfversion='R2010')
    msp = doc.modelspace()

    # --- Setup Layers ---
    doc.layers.new(name='POLE_MAIN', dxfattribs={'color': 7}) # White/Black
    doc.layers.new(name='FRAME_STEEL', dxfattribs={'color': 1}) # Red
    doc.layers.new(name='CONCRETE', dxfattribs={'color': 8}) # Grey
    doc.layers.new(name='DIMENSIONS', dxfattribs={'color': 3}) # Green
    doc.layers.new(name='TEXT', dxfattribs={'color': 2}) # Yellow

    # --- CONSTANTS (in mm) ---
    POLE_OD = 114.3 # 4 inch NB (approx OD)
    POLE_H_ABOVE = 3000
    POLE_H_BELOW = 1500
    GROUND_LEVEL = 0
    PANEL_L = 1920
    PANEL_W = 1030
    PANEL_THICK = 35
    TILT_ANGLE = 18 # degrees
    FRAME_W = 1200
    FRAME_L = 2000

    # --- DRAWING: SIDE ELEVATION (X=0 to X=2000) ---
    origin_x = 0
    origin_y = 0

    # 1. Main Pole
    msp.add_lwpolyline([
        (origin_x - POLE_OD/2, origin_y - POLE_H_BELOW),
        (origin_x + POLE_OD/2, origin_y - POLE_H_BELOW),
        (origin_x + POLE_OD/2, origin_y + POLE_H_ABOVE),
        (origin_x - POLE_OD/2, origin_y + POLE_H_ABOVE),
        (origin_x - POLE_OD/2, origin_y - POLE_H_BELOW)
    ], dxfattribs={'layer': 'POLE_MAIN'})

    # 2. Ground Line
    msp.add_line((-1000, 0), (1000, 0), dxfattribs={'layer': 'CONCRETE', 'linetype': 'DASHED'})
    msp.add_text("GROUND LEVEL (0.0m)", dxfattribs={'layer': 'TEXT', 'height': 50}).set_placement((600, 20), align=TextEntityAlignment.LEFT)

    # 3. Foundation (Concrete)
    msp.add_lwpolyline([
        (origin_x - 300, origin_y - POLE_H_BELOW),
        (origin_x + 300, origin_y - POLE_H_BELOW),
        (origin_x + 300, origin_y),
        (origin_x - 300, origin_y),
        (origin_x - 300, origin_y - POLE_H_BELOW)
    ], dxfattribs={'layer': 'CONCRETE'})
    
    # Anchor Rebar
    msp.add_line((origin_x - 200, origin_y - POLE_H_BELOW + 150), (origin_x + 200, origin_y - POLE_H_BELOW + 150), dxfattribs={'layer': 'FRAME_STEEL'})

    # 4. Enclosure Mounts (Flat Bar)
    # Approx 1.2m from ground
    mount_h = 1200
    msp.add_line((origin_x - POLE_OD/2, mount_h), (origin_x - POLE_OD/2 - 50, mount_h), dxfattribs={'layer': 'FRAME_STEEL', 'lineweight': 30})
    msp.add_line((origin_x + POLE_OD/2, mount_h), (origin_x + POLE_OD/2 + 50, mount_h), dxfattribs={'layer': 'FRAME_STEEL', 'lineweight': 30})
    msp.add_line((origin_x - POLE_OD/2, mount_h + 400), (origin_x - POLE_OD/2 - 50, mount_h + 400), dxfattribs={'layer': 'FRAME_STEEL', 'lineweight': 30})
    msp.add_line((origin_x + POLE_OD/2, mount_h + 400), (origin_x + POLE_OD/2 + 50, mount_h + 400), dxfattribs={'layer': 'FRAME_STEEL', 'lineweight': 30})

    # 5. Rotating Sleeve & Head
    sleeve_h = POLE_H_ABOVE - 100
    sleeve_l = 300
    msp.add_lwpolyline([
        (origin_x - POLE_OD/2 - 6, sleeve_h - sleeve_l),
        (origin_x + POLE_OD/2 + 6, sleeve_h - sleeve_l),
        (origin_x + POLE_OD/2 + 6, sleeve_h),
        (origin_x - POLE_OD/2 - 6, sleeve_h),
        (origin_x - POLE_OD/2 - 6, sleeve_h - sleeve_l)
    ], dxfattribs={'layer': 'FRAME_STEEL'})

    # 6. Tilted Panel Frame (Simplified representation)
    # Pivot point at top of sleeve
    pivot_x = origin_x
    pivot_y = sleeve_h
    
    import math
    rad = math.radians(TILT_ANGLE)
    
    # Frame is 2000mm long centered on pivot
    f_dx = (FRAME_L / 2) * math.cos(rad)
    f_dy = (FRAME_L / 2) * math.sin(rad)
    
    p1 = (pivot_x - f_dx, pivot_y + f_dy) # Top/High end (South is typically lower in N.Hemisphere, drawing convention varies, let's assume standard tilt)
    # Let's tilt "back" for visual clarity
    p1 = (pivot_x + f_dx, pivot_y - f_dy) # Low end
    p2 = (pivot_x - f_dx, pivot_y + f_dy) # High end
    
    msp.add_line(p1, p2, dxfattribs={'layer': 'FRAME_STEEL', 'lineweight': 50}) # The Frame
    
    # Solar Panel on top
    panel_offset_x = 40 * math.sin(rad)
    panel_offset_y = 40 * math.cos(rad)
    msp.add_line(
        (p1[0] - panel_offset_x, p1[1] + panel_offset_y), 
        (p2[0] - panel_offset_x, p2[1] + panel_offset_y), 
        dxfattribs={'layer': 'POLE_MAIN', 'linetype': 'DASHED'}
    ) # The Panel

    # --- DRAWING: TOP VIEW (Detail of H-Frame) X=3000 ---
    top_x = 3000
    top_y = 2000

    # Frame Outline
    msp.add_lwpolyline([
        (top_x - FRAME_W/2, top_y - FRAME_L/2),
        (top_x + FRAME_W/2, top_y - FRAME_L/2),
        (top_x + FRAME_W/2, top_y + FRAME_L/2),
        (top_x - FRAME_W/2, top_y + FRAME_L/2),
        (top_x - FRAME_W/2, top_y - FRAME_L/2)
    ], dxfattribs={'layer': 'FRAME_STEEL'})
    
    # Cross Braces
    msp.add_line((top_x - FRAME_W/2, top_y), (top_x + FRAME_W/2, top_y), dxfattribs={'layer': 'FRAME_STEEL'})
    msp.add_line((top_x - FRAME_W/2, top_y - FRAME_L/4), (top_x + FRAME_W/2, top_y - FRAME_L/4), dxfattribs={'layer': 'FRAME_STEEL'})
    msp.add_line((top_x - FRAME_W/2, top_y + FRAME_L/4), (top_x + FRAME_W/2, top_y + FRAME_L/4), dxfattribs={'layer': 'FRAME_STEEL'})

    # Center Sleeve Circle
    msp.add_circle((top_x, top_y), radius=60, dxfattribs={'layer': 'POLE_MAIN'})

    # --- ANNOTATIONS ---
    msp.add_text("SIDE ELEVATION", dxfattribs={'height': 80, 'layer': 'TEXT'}).set_placement((0, -2000), align=TextEntityAlignment.CENTER)
    msp.add_text("TOP VIEW (FRAME)", dxfattribs={'height': 80, 'layer': 'TEXT'}).set_placement((top_x, -2000), align=TextEntityAlignment.CENTER)
    
    msp.add_text("Main Pole: 100mm NB Heavy", dxfattribs={'height': 40, 'layer': 'TEXT'}).set_placement((200, 1000))
    msp.add_text("Depth: 1500mm", dxfattribs={'height': 40, 'layer': 'TEXT'}).set_placement((400, -750))
    msp.add_text("Solar Panel 2m x 1m", dxfattribs={'height': 40, 'layer': 'TEXT'}).set_placement((top_x, top_y + 1100), align=TextEntityAlignment.CENTER)

    # Save
    doc.saveas("solar_pole_design.dxf")

create_solar_pole_dxf()