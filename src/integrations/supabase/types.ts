export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_activities: {
        Row: {
          activity_type: string
          admin_id: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          target_user_id: string | null
        }
        Insert: {
          activity_type: string
          admin_id: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          target_user_id?: string | null
        }
        Update: {
          activity_type?: string
          admin_id?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      checkins: {
        Row: {
          arm_cm: number | null
          body_fat_percentage: number | null
          chest_cm: number | null
          created_at: string
          energy_level: number | null
          id: string
          muscle_mass_kg: number | null
          notes: string | null
          photos: Json | null
          sleep_quality: number | null
          stress_level: number | null
          thigh_cm: number | null
          updated_at: string
          user_id: string
          waist_cm: number | null
          weight_kg: number | null
        }
        Insert: {
          arm_cm?: number | null
          body_fat_percentage?: number | null
          chest_cm?: number | null
          created_at?: string
          energy_level?: number | null
          id?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          photos?: Json | null
          sleep_quality?: number | null
          stress_level?: number | null
          thigh_cm?: number | null
          updated_at?: string
          user_id: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Update: {
          arm_cm?: number | null
          body_fat_percentage?: number | null
          chest_cm?: number | null
          created_at?: string
          energy_level?: number | null
          id?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          photos?: Json | null
          sleep_quality?: number | null
          stress_level?: number | null
          thigh_cm?: number | null
          updated_at?: string
          user_id?: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      episodes: {
        Row: {
          amazon_link: string | null
          apple_link: string | null
          created_at: string
          description: string | null
          duration: string | null
          featured: boolean | null
          guest: string | null
          id: string
          publish_date: string | null
          spotify_link: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          youtube_link: string | null
        }
        Insert: {
          amazon_link?: string | null
          apple_link?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          featured?: boolean | null
          guest?: string | null
          id?: string
          publish_date?: string | null
          spotify_link?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          youtube_link?: string | null
        }
        Update: {
          amazon_link?: string | null
          apple_link?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          featured?: boolean | null
          guest?: string | null
          id?: string
          publish_date?: string | null
          spotify_link?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          youtube_link?: string | null
        }
        Relationships: []
      }
      equipment_types: {
        Row: {
          check_frequency_days: number
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          check_frequency_days?: number
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          check_frequency_days?: number
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      hosts: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          socials: Json | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          socials?: Json | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          socials?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_history: {
        Row: {
          changed_at: string
          changed_by: string
          field_changed: string
          id: string
          log_id: string
          new_value: string | null
          old_value: string | null
        }
        Insert: {
          changed_at?: string
          changed_by: string
          field_changed: string
          id?: string
          log_id: string
          new_value?: string | null
          old_value?: string | null
        }
        Update: {
          changed_at?: string
          changed_by?: string
          field_changed?: string
          id?: string
          log_id?: string
          new_value?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_history_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "maintenance_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_logs: {
        Row: {
          closed_at: string | null
          closed_by: string | null
          created_at: string
          created_by: string
          equipment_description: string
          equipment_type: string | null
          follow_up_date: string | null
          id: string
          is_routine_check: boolean | null
          last_routine_check_date: string | null
          notes: string | null
          priority: Database["public"]["Enums"]["maintenance_priority"]
          status: Database["public"]["Enums"]["maintenance_status"]
          updated_at: string
        }
        Insert: {
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          created_by: string
          equipment_description: string
          equipment_type?: string | null
          follow_up_date?: string | null
          id?: string
          is_routine_check?: boolean | null
          last_routine_check_date?: string | null
          notes?: string | null
          priority?: Database["public"]["Enums"]["maintenance_priority"]
          status?: Database["public"]["Enums"]["maintenance_status"]
          updated_at?: string
        }
        Update: {
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          created_by?: string
          equipment_description?: string
          equipment_type?: string | null
          follow_up_date?: string | null
          id?: string
          is_routine_check?: boolean | null
          last_routine_check_date?: string | null
          notes?: string | null
          priority?: Database["public"]["Enums"]["maintenance_priority"]
          status?: Database["public"]["Enums"]["maintenance_status"]
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_photos: {
        Row: {
          id: string
          log_id: string
          uploaded_at: string
          url: string
        }
        Insert: {
          id?: string
          log_id: string
          uploaded_at?: string
          url: string
        }
        Update: {
          id?: string
          log_id?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_photos_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "maintenance_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_messages: {
        Row: {
          content: string
          created_at: string
          created_by: string
          failed_count: number | null
          id: string
          metadata: Json | null
          scheduled_at: string | null
          sent_count: number | null
          status: string
          target_audience: string
          title: string
          total_recipients: number | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          failed_count?: number | null
          id?: string
          metadata?: Json | null
          scheduled_at?: string | null
          sent_count?: number | null
          status?: string
          target_audience?: string
          title: string
          total_recipients?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          failed_count?: number | null
          id?: string
          metadata?: Json | null
          scheduled_at?: string | null
          sent_count?: number | null
          status?: string
          target_audience?: string
          title?: string
          total_recipients?: number | null
        }
        Relationships: []
      }
      message_recipients: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string
          sent_at: string | null
          status: string
          user_id: string
          whatsapp_message_id: string | null
          whatsapp_number: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id: string
          sent_at?: string | null
          status?: string
          user_id: string
          whatsapp_message_id?: string | null
          whatsapp_number: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string
          sent_at?: string | null
          status?: string
          user_id?: string
          whatsapp_message_id?: string | null
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_recipients_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "marketing_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          allergies: string[] | null
          avatar_url: string | null
          created_at: string
          dietary_requirements: string[] | null
          display_name: string | null
          email: string | null
          equipment_available: string[] | null
          experience_level: string | null
          fitness_goal: string | null
          gender: string | null
          height_cm: number | null
          id: string
          injuries: string[] | null
          is_premium: boolean | null
          preferred_workout_days: number | null
          updated_at: string
          waist_cm: number | null
          weight_kg: number | null
          whatsapp_number: string | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_requirements?: string[] | null
          display_name?: string | null
          email?: string | null
          equipment_available?: string[] | null
          experience_level?: string | null
          fitness_goal?: string | null
          gender?: string | null
          height_cm?: number | null
          id: string
          injuries?: string[] | null
          is_premium?: boolean | null
          preferred_workout_days?: number | null
          updated_at?: string
          waist_cm?: number | null
          weight_kg?: number | null
          whatsapp_number?: string | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_requirements?: string[] | null
          display_name?: string | null
          email?: string | null
          equipment_available?: string[] | null
          experience_level?: string | null
          fitness_goal?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          injuries?: string[] | null
          is_premium?: boolean | null
          preferred_workout_days?: number | null
          updated_at?: string
          waist_cm?: number | null
          weight_kg?: number | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      reels: {
        Row: {
          caption: string | null
          created_at: string
          embed_url: string
          id: string
          instagram_id: string | null
          publish_date: string | null
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          embed_url: string
          id?: string
          instagram_id?: string | null
          publish_date?: string | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          embed_url?: string
          id?: string
          instagram_id?: string | null
          publish_date?: string | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website_link: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website_link?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_link?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          marketing_consent: boolean | null
          mobile: string | null
          privacy_consent: boolean | null
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          marketing_consent?: boolean | null
          mobile?: string | null
          privacy_consent?: boolean | null
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          marketing_consent?: boolean | null
          mobile?: string | null
          privacy_consent?: boolean | null
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workout_programs: {
        Row: {
          created_at: string
          current_week: number | null
          id: string
          last_progression_date: string | null
          program_data: Json
          program_name: string
          progression_type: string | null
          start_date: string
          status: string | null
          total_weeks: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_week?: number | null
          id?: string
          last_progression_date?: string | null
          program_data: Json
          program_name: string
          progression_type?: string | null
          start_date?: string
          status?: string | null
          total_weeks?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_week?: number | null
          id?: string
          last_progression_date?: string | null
          program_data?: Json
          program_name?: string
          progression_type?: string | null
          start_date?: string
          status?: string | null
          total_weeks?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workout_reviews: {
        Row: {
          completed_at: string
          created_at: string
          difficulty_rating: number | null
          energy_level: number | null
          exercises_completed: Json | null
          form_rating: number | null
          id: string
          notes: string | null
          user_id: string
          workout_name: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          difficulty_rating?: number | null
          energy_level?: number | null
          exercises_completed?: Json | null
          form_rating?: number | null
          id?: string
          notes?: string | null
          user_id: string
          workout_name: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          difficulty_rating?: number | null
          energy_level?: number | null
          exercises_completed?: Json | null
          form_rating?: number | null
          id?: string
          notes?: string | null
          user_id?: string
          workout_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_message_stats: {
        Args: { message_id: string }
        Returns: {
          delivered_count: number
          failed_count: number
          read_count: number
          sent_count: number
          total_recipients: number
        }[]
      }
      get_overdue_equipment_checks: {
        Args: Record<PropertyKey, never>
        Returns: {
          days_overdue: number
          equipment_type: string
          frequency_days: number
          last_check_date: string
        }[]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: {
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      progress_workout_program: {
        Args: { program_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "coach" | "premium_member" | "free_member" | "staff"
      maintenance_priority: "low" | "medium" | "high" | "urgent"
      maintenance_status: "ok" | "needs_attention" | "out_of_order" | "fixed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "coach", "premium_member", "free_member", "staff"],
      maintenance_priority: ["low", "medium", "high", "urgent"],
      maintenance_status: ["ok", "needs_attention", "out_of_order", "fixed"],
    },
  },
} as const
